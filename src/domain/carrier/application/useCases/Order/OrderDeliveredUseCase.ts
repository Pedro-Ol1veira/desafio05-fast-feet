import { Either, left, right } from "@/core/either";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";

interface OrderDeliveredUseCaseRequest {
    id: string;
}

type OrderDeliveredUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

export class OrderDeliveredUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ id }: OrderDeliveredUseCaseRequest): Promise<OrderDeliveredUseCaseResponse> {

        const order = await this.orderRepository.findById(id);
        if(!order) return left(new ResourseNotFound());

        order.status = "ENTREGUE";
        
        await this.orderRepository.save(order);

        return right({ order });
    }
}