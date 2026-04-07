import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { DeleteOrderUseCase } from "@/domain/carrier/application/useCases/Order/DeleteOrderUseCase";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";


@Controller("/orders/:id")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class DeleteOrderController {

    constructor(
        private deleteOrder: DeleteOrderUseCase,
    ) {}
    
    @Delete()
    @HttpCode(204)
    async handle(
        @Param('id') orderId: string,
    ) {
        
        const result = await this.deleteOrder.execute({
            id: orderId
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