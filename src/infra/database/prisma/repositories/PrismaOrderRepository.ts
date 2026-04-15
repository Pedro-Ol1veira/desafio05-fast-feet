import { FindManyNearByParams, OrderRepository } from "@/domain/carrier/application/repositories/OrderRepository";
import { PaginationParams } from "@/domain/carrier/application/repositories/PaginationParams";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaOrderMapper } from "../mappers/PrismaOrderMapper";
import { Prisma } from "prisma/generated/client";
import { Order as PrismaOrder } from "prisma/generated/client";
import { DomainEvents } from "@/core/events/DomainEvents";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {

    constructor(private prisma: PrismaService) {}

    async create(order: Order): Promise<void> {
        const data = PrismaOrderMapper.toPrisma(order);

        await this.prisma.order.create({
            data
        });
    }

    async findById(id: string): Promise<Order | null> {
        const order = await this.prisma.order.findUnique({
            where: {
                id
            }
        });

        if(!order) return null;

        return PrismaOrderMapper.toDomain(order);
    }

    async save(order: Order): Promise<void> {
        const data = PrismaOrderMapper.toPrisma(order);

        await this.prisma.order.update({
            where: {
                id: order.id.toString()
            },
            data
        });

        DomainEvents.dispatchEventsForAggregate(order.id); // Need to refactor to send a notification only if the status was changed and not on every edit order
    }

    async delete(order: Order): Promise<void> {
        await this.prisma.order.delete({
            where: {
                id: order.id.toString()
            },
        });
    }

    async fetchCarryingOrders(carryingId: string, { page }: PaginationParams): Promise<Order[]> {
        const orders = await this.prisma.order.findMany({
            where: {
                carryingId
            },
            take: 20,
            skip: (page - 1) * 20
        });

        return orders.map(PrismaOrderMapper.toDomain);
    }

    async findManyOrdersNearBy({ latitude, longitude }: FindManyNearByParams, carryingId: string): Promise<Order[]> {
        const schema = new URL(process.env.DATABASE_URL ?? "").searchParams.get('schema');
        const orders = await this.prisma.$queryRaw<PrismaOrder[]>`
            SELECT * from ${Prisma.raw(`"${schema}"."Order"`)}
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `;

        return orders.map(PrismaOrderMapper.toDomain);
    }
}