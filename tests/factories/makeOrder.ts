import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Order, OrderProps } from "../../src/domain/carrier/enterprise/entities/Order";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaOrderMapper } from "@/infra/database/prisma/mappers/PrismaOrderMapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";

export function makeOrder(overide: Partial<OrderProps> = {}, id?: UniqueEntityId) {
    const newOrder = Order.create({
        address: Address.create({
            complement: faker.location.streetAddress(),
            latitude: faker.location.latitude(),
            longitude: faker.location.latitude(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street()
        }),
        customerId: new UniqueEntityId(),
        ...overide
    }, id);

    return newOrder;
}

@Injectable()
export class OrderFactory {
    constructor(private prisma: PrismaService) {}

    async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
        const order = makeOrder(data);

        await this.prisma.order.create({
            data: PrismaOrderMapper.toPrisma(order)
        });
        
        return order;
    }
}