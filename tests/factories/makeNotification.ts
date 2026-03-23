import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Notification, NotificationProps } from "../../src/domain/notification/enterprise/entities/Notification";
import { faker } from '@faker-js/faker';

export function makeNotification(overide: Partial<NotificationProps> = {}, id?: UniqueEntityId) {
    const newNotification = Notification.create({
        content: faker.lorem.text(),
        recipientId: new UniqueEntityId(),
        title: faker.lorem.words(),
        ...overide
    }, id);

    return newNotification;
}