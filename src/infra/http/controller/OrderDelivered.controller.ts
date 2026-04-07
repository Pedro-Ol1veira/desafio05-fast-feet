import { BadRequestException, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { OrderDeliveredUseCase } from "@/domain/carrier/application/useCases/Order/OrderDeliveredUseCase";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";


@Controller("/orders/:id/delivered")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class OrderDeliveredController {

    constructor(
        private orderDelivered: OrderDeliveredUseCase,
    ) {}
    
    @Patch()
    @HttpCode(204)
    async handle( 
        @Param('id') id: string,
    ) {
        
        const result = await this.orderDelivered.execute({
            id,
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