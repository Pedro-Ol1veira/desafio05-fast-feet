import { Either, left, right } from "@/core/either";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { Notification } from "../../enterprise/entities/Notification";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { NotAllowed } from "@/core/errors/errors/NotAllowed";


interface ReadNotificationUseCaseRequest {
    notificationId: string;
    recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<
    ResourseNotFound | NotAllowed,
    {
        notification: Notification;
    }
>

export class ReadNotificationUseCase {

    constructor(private notificationRepository: NotificationRepository) {}
    
    async execute({ notificationId, recipientId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

        const notification = await this.notificationRepository.findById(notificationId);
        if(!notification) return left(new ResourseNotFound());

        if(notification.recipientId.toString() !== recipientId) return left(new NotAllowed());
        
        notification.read();

        this.notificationRepository.save(notification);

        return right({ notification });
        
    }
}