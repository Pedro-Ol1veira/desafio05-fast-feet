import { BadRequestException, Controller, HttpCode, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { OrderWaitingUseCase } from "@/domain/carrier/application/useCases/Order/OrderWaitingUseCase";
import { OrderPresenter } from "../presenter/OrderPresenter";


@Controller("/orders/:id")
@UseGuards(JwtAuthGuard)
export class OrderWaitingController {

    constructor(
        private orderWaiting: OrderWaitingUseCase,
    ) {}
    
    @Patch()
    @HttpCode(204)
    async handle(
        @Param('id') orderId: string,
    ) {
        
        const result = await this.orderWaiting.execute({
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