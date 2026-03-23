import { Either, left, right } from "@/core/either";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";

interface DeleteOrderUseCaseRequest {
    id: string;
}

type DeleteOrderUseCaseResponse = Either<
    ResourseNotFound,
    {
        
    }
>

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