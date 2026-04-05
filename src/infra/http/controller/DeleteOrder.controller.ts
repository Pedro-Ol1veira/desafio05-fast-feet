import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { DeleteOrderUseCase } from "@/domain/carrier/application/useCases/Order/DeleteOrderUseCase";


@Controller("/orders/:id")
@UseGuards(JwtAuthGuard)
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