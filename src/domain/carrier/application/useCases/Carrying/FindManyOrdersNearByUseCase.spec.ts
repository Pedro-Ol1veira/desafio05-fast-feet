import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryOrderRepository } from "@/../tests/repositories/InMemoryOrderRepository";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { makeOrder } from "@/../tests/factories/makeOrder";
import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";
import { FindManyOrdersNearByUseCase } from "./FindManyOrdersNearByUseCase";


let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryCarryingRepository: InMemoryCarryingRepository;
let sut: FindManyOrdersNearByUseCase;

describe("Fetch carrying near by orders", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        sut = new FindManyOrdersNearByUseCase(inMemoryOrderRepository);
    })

    it('should fetch carrying near by orders', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId('carrying-1'))); 
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap-1",
            number: 2,
            street: "Rua",
            latitude: -12.9547427,
            longitude: -38.466192,
        }), carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap-2",
            number: 2,
            street: "Rua",
            latitude: -12.9547427,
            longitude: -38.466192,
        }), carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap-3",
            number: 2,
            street: "Rua",
            latitude: -12.7861834,
            longitude: -38.7088043,
        }), carryingId: new UniqueEntityId('carrying-1')}));

        const result = await sut.execute({
            carryingId: 'carrying-1',
            latitude: -12.9547427,
            longitude: -38.466192,
        });
        expect(result.isRight()).toBe(true);
        
        expect(result.value?.orders).toHaveLength(2);
        expect(result.value).toEqual(expect.objectContaining({
            orders: expect.arrayContaining([
                expect.objectContaining({ 
                    address: expect.objectContaining({ complement: "ap-1" })
                }),
                expect.objectContaining({ 
                    address: expect.objectContaining({ complement: "ap-2" })
                }),
            ]) 
        }));
    });
    
});