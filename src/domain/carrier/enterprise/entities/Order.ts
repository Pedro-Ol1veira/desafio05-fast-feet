import { AggregateRoot } from "@/core/entities/AggregateRoot";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { OrderStatusChangedEvent } from "../events/OrderStatusChangedEvent";
import { Address } from "./ValueObjects/Address";

export type OrderStatus = "AGUARDANDO" | "RETIRADA" | "ENTREGUE" | "DEVOLVIDA" | undefined;

export interface OrderProps {
    carryingId?: UniqueEntityId | null;
    customerId: UniqueEntityId;
    status?: OrderStatus | null;
    address: Address;
}

export class Order extends AggregateRoot<OrderProps> {
    
    get carryingId(): UniqueEntityId | undefined | null {
        return this.props.carryingId;
    };
    
    get customerId() {
        return this.props.customerId;
    };

    get address(): Address {
        return this.props.address;
    };

    get status(): OrderStatus | null {
        return this.props.status;
    }

    set carryingId(id: UniqueEntityId) {
        this.props.carryingId = id;
    };

    set customerId(id: UniqueEntityId) {
        this.props.customerId = id;
    };

    set address(address: Address) {
        this.props.address = address;
    };

    set status(status: OrderStatus) {
        this.props.status = status;

        this.addDomainEvent(new OrderStatusChangedEvent(this));
    }

    static create(props: OrderProps, id?: UniqueEntityId) {
        const order = new Order(props, id);
        
        return order;
    }
}