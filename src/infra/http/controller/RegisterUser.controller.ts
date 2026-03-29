import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { CreateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/CreateCarryingUseCase";
import { CreateCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/CreateCustomerUseCase";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";

const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    cpf: z.string(),
    password: z.string(),
    role: z.enum(['CARRYING', 'CUSTOMER'])
});

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>;

@Controller("/users")
export class RegisterUserController {

    constructor(
        private createCarrying: CreateCarryingUseCase,
        private createCustomer: CreateCustomerUseCase,
    ) {}
    
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(registerUserBodySchema))
    async handle(
        @Body() body: RegisterUserBodySchema
    ) {
        const { cpf, email, name, password, role } = body;

        if(role === 'CUSTOMER') {
            const result = await this.createCustomer.execute({
                cpf,
                email,
                name,
                password,
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
            const result = await this.createCarrying.execute({
                cpf,
                email,
                name,
                password
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