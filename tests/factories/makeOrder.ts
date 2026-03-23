import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Order, OrderProps } from "../../src/domain/carrier/enterprise/entities/Order";
import { faker } from '@faker-js/faker';

export function makeOrder(overide: Partial<OrderProps> = {}, id?: UniqueEntityId) {
    const newOrder = Order.create({
        address: faker.location.streetAddress(),
        carryingId: new UniqueEntityId(),
        customerId: new UniqueEntityId(), 
        ...overide
    }, id);

    return newOrder;
}