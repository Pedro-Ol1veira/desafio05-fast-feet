import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Injectable } from "@nestjs/common";
import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";

interface EditOrderUseCaseRequest {
    orderId: string;
    carryingId: string;
    customerId: string;
    latitude: number;
    longitude: number;
    street: string;
    number: number;
    complement: string;
}

type EditOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

@Injectable()
export class EditOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private carryingRepository: CarryingRepository,
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ complement, latitude, longitude, number, street,
        carryingId, customerId, orderId }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
        const customer = await this.customerRepository.findById(customerId);
        if(!customer) return left(new ResourseNotFound());

        const carrying = await this.carryingRepository.findById(carryingId);
        if(!carrying) return left(new ResourseNotFound());

        const order = await this.orderRepository.findById(orderId);
        if(!order) return left(new ResourseNotFound());

        order.address = Address.create({
            complement,
            latitude,
            longitude, 
            number, 
            street
        });
        order.carryingId = new UniqueEntityId(carryingId);
        order.customerId = new UniqueEntityId(customerId);

        await this.orderRepository.save(order);

        return right({ order });
    }
}