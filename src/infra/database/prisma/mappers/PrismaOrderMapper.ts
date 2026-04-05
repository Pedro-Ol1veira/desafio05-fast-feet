import { UniqueEntityId } from '@/core/entities/UniqueEntityId';
import { Order } from '@/domain/carrier/enterprise/entities/Order';
import { Prisma, Order as PrismaOrder } from 'prisma/generated/client';

export class PrismaOrderMapper {
    static toDomain(raw: PrismaOrder) {
        return Order.create({
            address: raw.address,
            customerId: new UniqueEntityId(raw.customerId),
            carryingId: new UniqueEntityId(raw.carryingId ?? ""),
            status: raw.status
        })
    }

    static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
        return {
            id: order.id.toString(),
            address: order.address,
            customerId: order.customerId.toString(),
            carryingId: order.carryingId?.toString(),
            status: order.status
        }
    }
}