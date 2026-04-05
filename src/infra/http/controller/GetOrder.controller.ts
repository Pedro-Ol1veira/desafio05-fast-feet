import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { GetOrderByIdUseCase } from "@/domain/carrier/application/useCases/Order/GetOrderByIdUseCase";
import { OrderPresenter } from "../presenter/OrderPresenter";


@Controller("/orders/:id")
@UseGuards(JwtAuthGuard)
export class GetOrderByIdController {

    constructor(
        private getOrderById: GetOrderByIdUseCase,
    ) {}
    
    @Get()
    @HttpCode(200)
    async handle(
        @Param('id') orderId: string,
    ) {
        
        const result = await this.getOrderById.execute({
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

        const { order } = result.value;

        return { order: OrderPresenter.toHTTP(order) };
    }
}