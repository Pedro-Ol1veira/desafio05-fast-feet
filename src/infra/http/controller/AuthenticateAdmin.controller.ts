import { AuthenticateAdminUseCase } from "@/domain/carrier/application/useCases/admin/AuthenticateAdminUseCase";
import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import z from "zod";
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";

const authenticateAdminBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
});

type authenticateAdminBodySchema = z.infer<typeof authenticateAdminBodySchema>;

@Controller("/sessions")
export class AuthenticateController {

    constructor(
        private authenticateAdmin: AuthenticateAdminUseCase
    ) {}
    
    @Post()
    @UsePipes(new ZodValidationPipe(authenticateAdminBodySchema))
    async handle(
        @Body() body: authenticateAdminBodySchema
    ) {

        const { cpf, password } = body;
        
        const result = await this.authenticateAdmin.execute({
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