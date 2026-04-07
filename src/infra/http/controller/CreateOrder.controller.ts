import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post, UseGuards, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { CreateOrderUseCase } from "@/domain/carrier/application/useCases/Order/CreateOrderUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";

const createOrderBodySchema = z.object({
    customerId: z.uuid(),
    address: z.string()
});

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

@Controller("/orders")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class CreateOrderController {

    constructor(
        private createOrder: CreateOrderUseCase
    ) {}
    
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createOrderBodySchema))
    async handle(
        @Body() body: CreateOrderBodySchema
    ) {
        const { customerId, address } = body;

        const result = await this.createOrder.execute({
            address,
            customerId
        });

        if(result.isLeft()) {
            const error = result.value;

            switch(error.constructor) {
                case ResourseNotFound:
                    throw new NotFoundException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

    }
}