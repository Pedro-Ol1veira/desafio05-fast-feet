import { Either, left, right } from "@/core/either";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { CarryingRepository } from "../../repositories/CarryingRepository";

interface OrderPickedUpUseCaseRequest {
    id: string;
    carryingId: string;
}

type OrderPickedUpUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

export class OrderPickedUpUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private carryingRepository: CarryingRepository,
    ) {}

    async execute({ id, carryingId }: OrderPickedUpUseCaseRequest): Promise<OrderPickedUpUseCaseResponse> {

        const order = await this.orderRepository.findById(id);
        if(!order) return left(new ResourseNotFound());

        const carrying = await this.carryingRepository.findById(carryingId);
        if(!carrying) return left(new ResourseNotFound());
        
        order.status = "RETIRADA";
        order.carryingId = carrying.id;
        await this.orderRepository.save(order);

        return right({ order });
    }
}