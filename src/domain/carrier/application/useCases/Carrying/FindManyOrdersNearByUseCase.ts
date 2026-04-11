import { Either, right } from "@/core/either";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";

interface FindManyOrdersNearByUseCaseRequest {
    carryingId: string;
    latitude: number;
    longitude: number;
}

type FindManyOrdersNearByUseCaseResponse = Either<
    null,
    {
        orders: Order[];
    }
>

@Injectable()
export class FindManyOrdersNearByUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ carryingId, latitude, longitude }: FindManyOrdersNearByUseCaseRequest): Promise<FindManyOrdersNearByUseCaseResponse> {
        const orders = await this.orderRepository.findManyOrdersNearBy({ latitude, longitude },carryingId);

        return right({ orders });
    }
}