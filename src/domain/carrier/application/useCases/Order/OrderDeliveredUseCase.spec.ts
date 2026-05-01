import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { OrderDeliveredUseCase } from "./OrderDeliveredUseCase";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { InMemoryAttachmentRepository } from "tests/repositories/InMemoryAttachmentRepository";
import { makeAttachment } from "tests/factories/makeAttachment";


let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: OrderDeliveredUseCase;

describe("Change status of an order to delivered", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
        sut = new OrderDeliveredUseCase(inMemoryOrderRepository, inMemoryAttachmentRepository);
    })

    it('should change status of an order to delivered', async () => {
        
        inMemoryOrderRepository.items.push(makeOrder({}, new UniqueEntityId("order-1")));
        const attachment = makeAttachment();
        inMemoryAttachmentRepository.items.push(attachment);

        const result = await sut.execute({
            id: "order-1",
            attachmentId: attachment.id.toString()
        });
        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            order: expect.objectContaining({
                status: "ENTREGUE",
                attachment: expect.any(String)
            })
        });
    });

    it('should not change status of a non-existent order', async () => {

        const attachment = makeAttachment();
        inMemoryAttachmentRepository.items.push(attachment);
        
        const result = await sut.execute({
            id: "non-existent-id",
            attachmentId: attachment.id.toString()
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });

    it('should not change status without a valida attachment', async () => {

        const attachment = makeAttachment();
        inMemoryAttachmentRepository.items.push(attachment);
        
        const result = await sut.execute({
            id: "non-existent-id",
            attachmentId: "no photo"
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });
    
});