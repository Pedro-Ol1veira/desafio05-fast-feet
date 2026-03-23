import { Either, left, right } from "@/core/either";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";

interface GetOrderByIdUseCaseRequest {
    id: string;
}

type GetOrderByIdUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order,        
    }
>

export class GetOrderByIdUseCase {

    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ id }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
        const order = await this.orderRepository.findById(id);
        
        if(!order) return left(new ResourseNotFound());

        return right({ order });
    }
}