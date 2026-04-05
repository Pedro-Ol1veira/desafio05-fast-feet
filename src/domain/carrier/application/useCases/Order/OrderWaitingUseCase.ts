import { Either, left, right } from "@/core/either";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";

interface OrderWaitingUseCaseRequest {
    id: string;
}

type OrderWaitingUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

export class OrderWaitingUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ id }: OrderWaitingUseCaseRequest): Promise<OrderWaitingUseCaseResponse> {

        const order = await this.orderRepository.findById(id);
        if(!order) return left(new ResourseNotFound());

        order.status = "AGUARDANDO";
        
        await this.orderRepository.save(order);

        return right({ order });
    }
}