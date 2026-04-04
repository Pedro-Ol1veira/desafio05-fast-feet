import { Body, Controller, Delete, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { z } from 'zod';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { DeleteCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/DeleteCustomerUseCase";
import { DeleteCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/DeleteCarryingUseCase";
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";

const deleteUserBodySchema = z.object({
    role: z.enum(['CARRYING', 'CUSTOMER'])
});

type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>;

@Controller("/users/:id")
@UseGuards(JwtAuthGuard)
export class DeleteUserController {

    constructor(
        private deleteCustomer: DeleteCustomerUseCase,
        private deleteCarrying: DeleteCarryingUseCase,
    ) {}
    
    @Delete()
    @HttpCode(204)
    async handle(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(deleteUserBodySchema)) body: DeleteUserBodySchema,
    ) {
        const { role } = body;

        if(role === 'CARRYING') {
            const result = await this.deleteCarrying.execute({ id });

            if(result.isLeft()) {
                throw new NotFoundException()
            }
        } else {
            const result = await this.deleteCustomer.execute({ id });

            if(result.isLeft()) {
                throw new NotFoundException()
            }
        }
    }
}