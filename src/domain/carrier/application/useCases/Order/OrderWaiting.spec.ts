import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { OrderWaitingUseCase } from "./OrderWaitingUseCase";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: OrderWaitingUseCase;

describe("Change status of a order to waiting", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        sut = new OrderWaitingUseCase(inMemoryOrderRepository);
    })

    it('should change status of an order to waiting', async () => {
        
        inMemoryOrderRepository.items.push(makeOrder({}, new UniqueEntityId("order-1")));

        const result = await sut.execute({
            id: "order-1",
        });
        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            order: expect.objectContaining({
                status: "aguardando"
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