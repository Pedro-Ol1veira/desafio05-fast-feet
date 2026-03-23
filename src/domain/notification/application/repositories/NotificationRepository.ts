import { Notification } from "../../enterprise/entities/Notification";

export abstract class NotificationRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract save(notification: Notification): Promise<void>;
    abstract findById(id: string): Promise<Notification | null>;
}