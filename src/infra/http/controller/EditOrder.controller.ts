import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, Put, UseGuards } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";
import { EditOrderUseCase } from "@/domain/carrier/application/useCases/Order/EditOrderUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";

const editOrderBodySchema = z.object({
    carryingId: z.string(),
    customerId: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    street: z.string(),
    number: z.coerce.number(),
    complement: z.string(),
});

type EditOrderBodySchema = z.infer<typeof editOrderBodySchema>;

@Controller("/orders/:id")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class EditOrderController {

    constructor(
        private editOrder: EditOrderUseCase
    ) {}
    
    @Put()
    @HttpCode(204)
    async handle(
        @Body(new ZodValidationPipe(editOrderBodySchema)) body: EditOrderBodySchema,
        @Param('id') orderId: string,
    ) {
        const { customerId, complement, latitude, longitude, number, street, carryingId } = body;
        
        const result = await this.editOrder.execute({
            orderId,
            complement,
            latitude,
            longitude,
            number,
            street,
            carryingId,
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