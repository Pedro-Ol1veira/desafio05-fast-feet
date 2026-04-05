import { Either, left, right } from "@/core/either";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Injectable } from "@nestjs/common";

interface DeleteOrderUseCaseRequest {
    id: string;
}

type DeleteOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        
    }
>

@Injectable()
export class DeleteOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ id }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
        const order = await this.orderRepository.findById(id);
        
        if(!order) return left(new ResourseNotFound());

        await this.orderRepository.delete(order);

        return right({});
    }
}