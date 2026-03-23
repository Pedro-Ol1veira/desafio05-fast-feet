import { makeOrder } from "@/../tests/factories/makeOrder";
import { InMemoryOrderRepository } from "@/../tests/repositories/InMemoryOrderRepository";
import { DeleteOrderUseCase } from "./DeleteOrderUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: DeleteOrderUseCase;

describe("Delete Order", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        sut = new DeleteOrderUseCase(inMemoryOrderRepository);
    })

    it('should delete a order', async () => {
        const order = makeOrder({ });
        inMemoryOrderRepository.items.push(order) 

        const result = await sut.execute({
            id: order.id.toString()
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryOrderRepository.items).toHaveLength(0);
    });

    it('should not delete a non-existent order', async () => {
        const order = makeOrder({ });
        inMemoryOrderRepository.items.push(order) 

        const result = await sut.execute({
            id: "non-existent-id"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
        expect(inMemoryOrderRepository.items).toHaveLength(1);
    });
    
});