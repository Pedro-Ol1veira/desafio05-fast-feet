import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { OrderDeliveredUseCase } from "@/domain/carrier/application/useCases/Order/OrderDeliveredUseCase";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";

const orderDeliveredBodySchema = z.object({
    attachmentId: z.string(),
});

type OrderDeliveredBodySchema = z.infer<typeof orderDeliveredBodySchema>;

@Controller("/orders/:id/delivered")
@Roles(Role.Carrying)
@UseGuards(JwtAuthGuard, RoleGuard)
export class OrderDeliveredController {

    constructor(
        private orderDelivered: OrderDeliveredUseCase,
    ) {}
    
    @Patch()
    @HttpCode(204)
    async handle( 
        @Param('id') id: string,
        @Body(new ZodValidationPipe(orderDeliveredBodySchema)) { attachmentId }: OrderDeliveredBodySchema, 
    ) {
        
        const result = await this.orderDelivered.execute({
            id,
            attachmentId,
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