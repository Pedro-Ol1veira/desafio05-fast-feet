import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put, UseGuards } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";
import { EditCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/EditCustomerUseCase";
import { EditCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/EditCarryingUseCase";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";

const editUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(['CARRYING', 'CUSTOMER'])
});

type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller("/users/:id")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class EditUserController {

    constructor(
        private editCustomer: EditCustomerUseCase,
        private editCarrying: EditCarryingUseCase,
    ) {}
    
    @Put()
    @HttpCode(204)
    async handle(
        @Body(new ZodValidationPipe(editUserBodySchema)) body: EditUserBodySchema,
        @Param('id') userId: string
    ) {
        const { email, name, password, role } = body;
        if(role === 'CUSTOMER') {
            const result = await this.editCustomer.execute({
                name,
                email,
                password,
                id: userId,
            });

            if(result.isLeft()) {
                const error = result.value;

                switch(error.constructor) {
                    case UserAlreadyExists:
                        throw new ConflictException(error.message);
                    default:
                        throw new BadRequestException(error.message);
                }
            }
        } else {
            const result = await this.editCarrying.execute({
                email,
                name,
                password,
                id: userId
            });

            if(result.isLeft()) {
                const error = result.value;

                switch(error.constructor) {
                    case UserAlreadyExists:
                        throw new ConflictException(error.message);
                    default:
                        throw new BadRequestException(error.message);
                }
            }
        }


    }
}