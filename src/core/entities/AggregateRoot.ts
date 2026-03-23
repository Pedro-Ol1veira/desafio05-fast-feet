import { DomainEvent } from "../events/DomainEvent";
import { Entity } from "./Entitiy";
import { DomainEvents } from "../events/DomainEvents";

export abstract class AggregateRoot<props> extends Entity<props> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
    }

    public clearEvents() {
        this._domainEvents = [];
    }
}