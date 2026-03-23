import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { InMemoryNotificationRepository } from "@/../tests/repositories/InMemoryNotificationRepository";
import { ReadNotificationUseCase } from "./ReadNotification"
import { makeNotification } from "@/../tests/factories/makeNotification";
import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { makeCustomer } from "@/../tests/factories/makeCustomer";
import { NotAllowed } from "@/core/errors/errors/NotAllowed";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let inMemoryCustomerRepository: InMemoryCustomerRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
    
    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository();
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
    })

    it('should read a notification', async () => {
        
        inMemoryCustomerRepository.items.push(makeCustomer({}, new UniqueEntityId("customer-1")));
        inMemoryNotificationRepository.items.push(makeNotification({ recipientId: new UniqueEntityId("customer-1")}, new UniqueEntityId("notification-1")));
        
        const result = await sut.execute({
            recipientId: "customer-1",
            notificationId: "notification-1"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            notification: expect.objectContaining({
                readAt: expect.any(Date)
            })
        })
    })

    it('should read an others customer notification', async () => {
        
        inMemoryCustomerRepository.items.push(makeCustomer({}, new UniqueEntityId("customer-1")));
        inMemoryNotificationRepository.items.push(makeNotification({ recipientId: new UniqueEntityId("customer-1")}, new UniqueEntityId("notification-1")));
        
        const result = await sut.execute({
            recipientId: "customer-2",
            notificationId: "notification-1"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowed);
    })
    
    
})