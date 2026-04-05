import { BadRequestException, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { ReturnedOrderUseCase } from "@/domain/carrier/application/useCases/Order/ReturnedOrderUseCase";


@Controller("/orders/:id/returned")
@UseGuards(JwtAuthGuard)
export class ReturnedOrderController {

    constructor(
        private returnedOrder: ReturnedOrderUseCase,
    ) {}
    
    @Patch()
    @HttpCode(204)
    async handle(
        @Param('id') orderId: string,
    ) {
        
        const result = await this.returnedOrder.execute({
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