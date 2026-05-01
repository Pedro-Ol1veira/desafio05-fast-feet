import { Either, left, right } from "@/core/either";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Injectable } from "@nestjs/common";
import { AttachmentRepository } from "../../repositories/AttachmentRepository";

interface OrderDeliveredUseCaseRequest {
    id: string;
    attachmentId: string;
}

type OrderDeliveredUseCaseResponse = Either<
    ResourseNotFound,
    {
        order: Order;
    }
>

@Injectable()
export class OrderDeliveredUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private attachmentRepository: AttachmentRepository
    ) {}

    async execute({ id, attachmentId }: OrderDeliveredUseCaseRequest): Promise<OrderDeliveredUseCaseResponse> {

        const order = await this.orderRepository.findById(id);
        if(!order) return left(new ResourseNotFound());
        const attachment = await this.attachmentRepository.findById(attachmentId);
        if(!attachment) return left(new ResourseNotFound());
        
        order.status = "ENTREGUE";
        order.attachment = attachmentId;
        
        await this.orderRepository.save(order);

        return right({ order });
    }
}