import { NotificationRepository } from "@/domain/notification/application/repositories/NotificationRepository";
import { Notification } from "@/domain/notification/enterprise/entities/Notification";


export class InMemoryNotificationRepository implements NotificationRepository {
    
    public items: Notification[] = [];
    
    async create(notification: Notification): Promise<void> {
        this.items.push(notification);
    }
    
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.items.findIndex(item => item.id === notification.id);

        this.items[notificationIndex] = notification;
    }
    async findById(id: string): Promise<Notification | null> {
        const notification = this.items.find(item => item.id.toString() === id);
        if(!notification) return null;

        return notification;
    }
}