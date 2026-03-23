import { makeOrder } from "@/../tests/factories/makeOrder";
import { InMemoryOrderRepository } from "@/../tests/repositories/InMemoryOrderRepository";
import { GetOrderByIdUseCase } from "./GetOrderByIdUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";


let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderByIdUseCase;

describe("Get Order By Id", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        sut = new GetOrderByIdUseCase(inMemoryOrderRepository);
    })

    it('should get na order by id', async () => {
        inMemoryOrderRepository.items.push(makeOrder({}, new UniqueEntityId("order-1"))) 

        const result = await sut.execute({
            id: "order-1"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            order: expect.objectContaining({
                id: new UniqueEntityId("order-1")
            })
        });
    });

    it('should not get order by a non-existent id', async () => {
        const result = await sut.execute({
            id: "non-existent-id"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
    });
    
});