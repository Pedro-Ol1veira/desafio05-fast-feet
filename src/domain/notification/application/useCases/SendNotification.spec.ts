import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { InMemoryNotificationRepository } from "../../../../../tests/repositories/InMemoryNotificationRepository";
import { SendNotificationUseCase } from "./SendNotification"

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
    
    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository();
        sut = new SendNotificationUseCase(inMemoryNotificationRepository);
    })

    it('should send a notification', async () => {
        
        const result = await sut.execute({
            title: "Encomenda movimentada",
            content: "A sua encomenda foi entregue",
            recipientId: "recipient-1"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            notification: expect.objectContaining({
                recipientId: new UniqueEntityId("recipient-1")
            })
        })
    })
    
    
})