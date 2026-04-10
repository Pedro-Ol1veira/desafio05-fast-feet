import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Injectable } from "@nestjs/common";
import { Address } from "@/domain/carrier/enterprise/entities/Address";

interface CreateOrderUseCaseRequest {
    customerId: string;
    complement: string;
    street: string;
    number: number;
    latitude: number;
    longitude: number;
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
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ complement, latitude, longitude, number, street, customerId }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const customer = await this.customerRepository.findById(customerId);
        if(!customer) return left(new ResourseNotFound());
        const address = Address.create({
            complement,
            latitude,
            longitude,
            number,
            street,
        })
        const order = Order.create({
            address,
            customerId: new UniqueEntityId(customerId),
        });

        await this.orderRepository.create(order);

        return right({ order });
    }
}
