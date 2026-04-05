import { OrderRepository } from "@/domain/carrier/application/repositories/OrderRepository";
import { PaginationParams } from "@/domain/carrier/application/repositories/PaginationParams";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaOrderMapper } from "../mappers/PrismaOrderMapper";


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

}