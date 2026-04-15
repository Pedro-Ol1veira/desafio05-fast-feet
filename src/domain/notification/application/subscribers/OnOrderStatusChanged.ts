import { DomainEvents } from "@/core/events/DomainEvents";
import { EventHandler } from "@/core/events/EventHandler";
import { OrderStatusChangedEvent } from "@/domain/carrier/enterprise/events/OrderStatusChangedEvent";
import { SendNotificationUseCase } from "../useCases/SendNotification";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OnOrderStatusChanged implements EventHandler {

    constructor(
        private sendNotification: SendNotificationUseCase,
    ) {
        this.setupSubscriptions()
    }
    
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendChangedStatusNotification.bind(this), 
            OrderStatusChangedEvent.name
        );

    }

    private async sendChangedStatusNotification({ order }: OrderStatusChangedEvent) {
        this.sendNotification.execute({
            title: `Encomenda ${order.status}`,
            content:`Status da encomenda foi alterado para ${order.status}`,
            recipientId: order.customerId.toString()
        });
    }

}