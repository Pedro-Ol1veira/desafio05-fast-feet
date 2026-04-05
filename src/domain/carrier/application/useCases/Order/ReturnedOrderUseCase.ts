import { Either, left, right } from "@/core/either";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Injectable } from "@nestjs/common";

interface ReturnedOrderUseCaseRequest {
    id: string;
}

type ReturnedOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

@Injectable()
export class ReturnedOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ id }: ReturnedOrderUseCaseRequest): Promise<ReturnedOrderUseCaseResponse> {

        const order = await this.orderRepository.findById(id);
        if(!order) return left(new ResourseNotFound());

        order.status = "DEVOLVIDA";
        
        await this.orderRepository.save(order);

        return right({ order });
    }
}