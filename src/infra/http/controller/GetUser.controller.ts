import { Body, Controller, Get, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { z } from 'zod';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { GetCustomerByCpfUseCase } from "@/domain/carrier/application/useCases/Cutomer/GetCustomerByCpfUseCase";
import { GetCarryingByCpfUseCase } from "@/domain/carrier/application/useCases/Carrying/GetCarryingByCpfUseCase";
import { CarryingPresenter } from "../presenter/CarryingPresenter";
import { CustomerPresenter } from "../presenter/CustomerPresenter";

const getUserBodySchema = z.object({
    role: z.enum(['CARRYING', 'CUSTOMER'])
});

type GetUserBodySchema = z.infer<typeof getUserBodySchema>;

@Controller("/users/:cpf")
@UseGuards(JwtAuthGuard)
export class GetUserController {

    constructor(
        private getCustomer: GetCustomerByCpfUseCase,
        private getCarrying: GetCarryingByCpfUseCase,
    ) {}
    
    @Get()
    @HttpCode(200)
    async handle(
        @Param('cpf') cpf: string,
        @Body(new ZodValidationPipe(getUserBodySchema)) body: GetUserBodySchema,
    ) {
        const { role } = body;

        if(role === 'CARRYING') {
            const result = await this.getCarrying.execute({ cpf });

            if(result.isLeft()) {
                throw new NotFoundException()
            }

            const { carrying } = result.value;
            
            return { carrying: CarryingPresenter.toHTTP(carrying) }
        } else {
            const result = await this.getCustomer.execute({ cpf });

            if(result.isLeft()) {
                throw new NotFoundException()
            }

            const { customer } = result.value;

            return { customer: CustomerPresenter.toHTTP(customer)}
        }
    }
}