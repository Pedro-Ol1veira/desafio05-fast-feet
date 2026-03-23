import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { FetchCarryingOrdersUseCase } from "./FetchCarryingOrdersUseCase";
import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { InMemoryCarryingRepository } from "../../../../../../tests/repositories/InMemoryCarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";


let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryCarryingRepository: InMemoryCarryingRepository;
let sut: FetchCarryingOrdersUseCase;

describe("Fetch carrying orders", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        sut = new FetchCarryingOrdersUseCase(inMemoryOrderRepository);
    })

    it('should fetch carrying orders', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId('carrying-1'))); 
        inMemoryOrderRepository.items.push(makeOrder({address: "address1", carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: "address2", carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: "address3", carryingId: new UniqueEntityId('carrying-1')}));

        const result = await sut.execute({
            carryingId: 'carrying-1',
            page: 1
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            orders: expect.arrayContaining([
                expect.objectContaining({ address: "address1"}),
                expect.objectContaining({ address: "address2"}),
                expect.objectContaining({ address: "address3"}),
            ]) 
        }));
    });

    it('should fetch carrying orders with pagination', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId('carrying-1'))); 

        for(let i = 1; i <= 22; i++) {
            inMemoryOrderRepository.items.push(makeOrder({address: `address${i}`, carryingId: new UniqueEntityId('carrying-1')}));
        }
        
        const result = await sut.execute({
            carryingId: 'carrying-1',
            page: 2
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            orders: expect.arrayContaining([
                expect.objectContaining({ address: "address21"}),
                expect.objectContaining({ address: "address22"}),
            ])
        }));
    });
    
});