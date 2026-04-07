import { BadRequestException, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { OrderPickedUpUseCase } from "@/domain/carrier/application/useCases/Order/OrderPickedUpUseCase";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";


@Controller("/orders/:orderId/pickup/:carryingId")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
export class OrderPickedUpController {

    constructor(
        private orderPickedUp: OrderPickedUpUseCase,
    ) {}
    
    @Patch()
    @HttpCode(204)
    async handle( 
        @Param('orderId') orderId: string,
        @Param('carryingId') carryingId: string,
    ) {
        
        const result = await this.orderPickedUp.execute({
            id: orderId,
            carryingId
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