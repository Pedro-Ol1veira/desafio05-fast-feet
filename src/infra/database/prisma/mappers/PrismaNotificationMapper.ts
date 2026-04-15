import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Notification } from "@/domain/notification/enterprise/entities/Notification";
import { Prisma } from "prisma/generated/client";
import { Notification as PrismaNotification } from 'prisma/generated/client';

export class PrismaNotificationMapper {

    static toDomain(raw: PrismaNotification): Notification {
        return Notification.create({
            content: raw.content,
            recipientId: new UniqueEntityId(raw.recipientId),
            title: raw.title,
            createdAt: raw.createdAt,
            readAt: raw.readAt,
        }, new UniqueEntityId(raw.id));
    }

    static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput {
        return {
            id: notification.id.toString(),
            content: notification.content,
            recipientId: notification.recipientId.toString(),
            title: notification.title,
            createdAt: notification.createdAt,
            readAt: notification.readAt
        }
    }
}