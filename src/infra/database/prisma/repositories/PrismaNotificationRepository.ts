import { NotificationRepository } from "@/domain/notification/application/repositories/NotificationRepository";
import { Notification } from "@/domain/notification/enterprise/entities/Notification";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/PrismaNotificationMapper";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {

    constructor(private prisma: PrismaService) {}
    
    async create(notification: Notification): Promise<void> {
        const data = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.create({ data });
    }
    async save(notification: Notification): Promise<void> {
        const data = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.update({
            where: { id: notification.id.toString() },
            data,
        });
    }
    async findById(id: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: { id }
        });
        
        return notification ? PrismaNotificationMapper.toDomain(notification) : null;
    }

}