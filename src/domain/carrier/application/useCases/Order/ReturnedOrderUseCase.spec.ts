import { InMemoryOrderRepository } from "@/../tests/repositories/InMemoryOrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { ReturnedOrderUseCase } from "./ReturnedOrderUseCase";
import { makeOrder } from "@/../tests/factories/makeOrder";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: ReturnedOrderUseCase;

describe("Change status of a order to returned", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        sut = new ReturnedOrderUseCase(inMemoryOrderRepository);
    })

    it('should change status of an order to returned', async () => {
        
        inMemoryOrderRepository.items.push(makeOrder({}, new UniqueEntityId("order-1")));

        const result = await sut.execute({
            id: "order-1",
        });
        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            order: expect.objectContaining({
                status: "DEVOLVIDA"
            })
        });
    });

    it('should not change status of a non-existent order', async () => {
        
        const result = await sut.execute({
            id: "non-existent-id",
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });
    
});