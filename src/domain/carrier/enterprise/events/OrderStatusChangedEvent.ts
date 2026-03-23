import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { DomainEvent } from "@/core/events/DomainEvent";
import { Order } from "../entities/Order";

export class OrderStatusChangedEvent implements DomainEvent {
    public ocurredAt: Date;
    public order: Order;

    constructor(order: Order) {
        this.ocurredAt = new Date();
        this.order = order;
    }
    
    getAggregateId(): UniqueEntityId {
        return this.order.id
    }

}