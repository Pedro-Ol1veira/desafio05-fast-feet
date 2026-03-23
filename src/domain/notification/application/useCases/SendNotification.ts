import { Either, right } from "@/core/either";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { Notification } from "../../enterprise/entities/Notification";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";


interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}

type SendNotificationUseCaseResponse = Either<
    null,
    {
        notification: Notification;
    }
>

export class SendNotificationUseCase {

    constructor(private notificationRepository: NotificationRepository) {}
    
    async execute({ content, recipientId, title}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
        
        const notification = Notification.create({
            content,
            recipientId: new UniqueEntityId(recipientId),
            title,
        });

        await this.notificationRepository.create(notification);

        return right({ notification });
    }
}