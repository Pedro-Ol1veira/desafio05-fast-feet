import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

interface EditOrderUseCaseRequest {
    orderId: string;
    carryingId: string;
    customerId: string;
    address: string;
}

type EditOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

export class EditOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private carryingRepository: CarryingRepository,
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ address, carryingId, customerId, orderId }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
        const customer = await this.customerRepository.findById(customerId);
        if(!customer) return left(new ResourseNotFound());

        const carrying = await this.carryingRepository.findById(carryingId);
        if(!carrying) return left(new ResourseNotFound());

        const order = await this.orderRepository.findById(orderId);
        if(!order) return left(new ResourseNotFound());

        order.address = address;
        order.carryingId = new UniqueEntityId(carryingId);
        order.customerId = new UniqueEntityId(customerId);

        await this.orderRepository.save(order);

        return right({ order });
    }
}