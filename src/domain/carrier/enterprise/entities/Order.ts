import { AggregateRoot } from "@/core/entities/AggregateRoot";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { OrderStatusChangedEvent } from "../events/OrderStatusChangedEvent";

export type OrderStatus = "aguardando" | "retirada" | "entregue" | "devolvida" | undefined;

export interface OrderProps {
    carryingId?: UniqueEntityId;
    customerId: UniqueEntityId;
    status?: OrderStatus;
    address: string; // TODO: mudar essa prop para um agregado e separar o endereço como uma entidade
}

export class Order extends AggregateRoot<OrderProps> {
    
    get carryingId(): UniqueEntityId | undefined {
        return this.props.carryingId;
    };
    
    get customerId() {
        return this.props.customerId;
    };

    get address() {
        return this.props.address;
    };

    get status() {
        return this.props.status;
    }

    set carryingId(id: UniqueEntityId) {
        this.props.carryingId = id;
    };

    set customerId(id: UniqueEntityId) {
        this.props.customerId = id;
    };

    set address(address: string) {
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