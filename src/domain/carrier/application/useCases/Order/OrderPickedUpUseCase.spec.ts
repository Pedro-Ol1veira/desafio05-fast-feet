import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { OrderPickedUpUseCase } from "./OrderPickedUpUseCase";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { InMemoryCarryingRepository } from "../../../../../../tests/repositories/InMemoryCarryingRepository";
import { makeCarrying } from "../../../../../../tests/factories/makeCarrying";


let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryCarryingRepository: InMemoryCarryingRepository;
let sut: OrderPickedUpUseCase;

describe("Edit a new order", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        sut = new OrderPickedUpUseCase(inMemoryOrderRepository, inMemoryCarryingRepository);
    })

    it('should change status of an order to picked up', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId("carrying-1")));
        inMemoryOrderRepository.items.push(makeOrder({
            carryingId: new UniqueEntityId("carrying-1")
        }, new UniqueEntityId("order-1")));

        const result = await sut.execute({
            id: "order-1",
            carryingId: "carrying-1"
        });
        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            order: expect.objectContaining({
                status: "retirada",
                carryingId: new UniqueEntityId("carrying-1")
            })
        });
    });

    it('should not change status of a non-existent order', async () => {
        
        const result = await sut.execute({
            id: "non-existent-id",
            carryingId: "non-existent-id"
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });
    
});