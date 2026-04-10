import { UniqueEntityId } from '@/core/entities/UniqueEntityId';
import { Order } from '@/domain/carrier/enterprise/entities/Order';
import { Address } from '@/domain/carrier/enterprise/entities/ValueObjects/Address';
import { Prisma, Order as PrismaOrder } from 'prisma/generated/client';

export class PrismaOrderMapper {
    static toDomain(raw: PrismaOrder) {
        return Order.create({
            address: Address.create({
                complement: raw.complement,
                latitude: Number(raw.latitude),
                longitude: Number(raw.longitude),
                number: raw.number,
                street: raw.street,
            }),
            customerId: new UniqueEntityId(raw.customerId),
            carryingId: raw.carryingId ? new UniqueEntityId(raw.carryingId) : null,
            status: raw.status
        }, new UniqueEntityId(raw.id))
    }

    static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
        return {
            id: order.id.toString(),
            complement: order.address.complement,
            latitude: order.address.latitude,
            longitude: order.address.longitude,
            number: order.address.number,
            street: order.address.street,
            customerId: order.customerId.toString(),
            carryingId: order.carryingId?.toString(),
            status: order.status
        }
    }
}