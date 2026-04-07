import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";
import { AuthenticateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/AuthenticateCarryingUseCase";

const authenticateCarryingBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
});

type authenticateCarryingBodySchema = z.infer<typeof authenticateCarryingBodySchema>;

@Controller("/sessions/carrying")
export class AuthenticateCarryingController {

    constructor(
        private authenticateCarrying: AuthenticateCarryingUseCase
    ) {}
    
    @Post()
    @UsePipes(new ZodValidationPipe(authenticateCarryingBodySchema))
    async handle(
        @Body() body: authenticateCarryingBodySchema
    ) {

        const { cpf, password } = body;
        
        const result = await this.authenticateCarrying.execute({
            cpf,
            password
        });

        if(result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case WrongCredentials:
                    throw new UnauthorizedException(error.message)
                default:
                    throw new BadRequestException(error.message)

            }
        };

        const { accessToken } = result.value;

        return { accessToken };
    }
}