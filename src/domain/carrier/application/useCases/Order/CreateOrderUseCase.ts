import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Injectable } from "@nestjs/common";

interface CreateOrderUseCaseRequest {
    customerId: string;
    address: string;
}

type CreateOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

@Injectable()
export class CreateOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private carryingRepository: CarryingRepository,
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ address, customerId }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const customer = await this.customerRepository.findById(customerId);
        if(!customer) return left(new ResourseNotFound());

        const order = Order.create({
            address,
            customerId: new UniqueEntityId(customerId),
        });

        await this.orderRepository.create(order);

        return right({ order });
    }
}