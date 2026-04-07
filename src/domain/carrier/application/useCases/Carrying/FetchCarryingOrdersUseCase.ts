import { Either, right } from "@/core/either";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";

interface FetchCarryingOrdersUseCaseRequest {
    carryingId: string;
    page: number;
}

type FetchCarryingOrdersUseCaseResponse = Either<
    null,
    {
        orders: Order[];
    }
>

@Injectable()
export class FetchCarryingOrdersUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ carryingId, page }: FetchCarryingOrdersUseCaseRequest): Promise<FetchCarryingOrdersUseCaseResponse> {
        const orders = await this.orderRepository.fetchCarryingOrders(carryingId, { page });

        return right({ orders });
    }
}