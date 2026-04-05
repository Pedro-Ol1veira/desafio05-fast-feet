import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { OrderDeliveredUseCase } from "@/domain/carrier/application/useCases/Order/OrderDeliveredUseCase";


@Controller("/orders/:id/delivered")
@UseGuards(JwtAuthGuard)
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