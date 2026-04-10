import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { FetchCarryingOrdersUseCase } from "./FetchCarryingOrdersUseCase";
import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { InMemoryCarryingRepository } from "../../../../../../tests/repositories/InMemoryCarryingRepository";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";
import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";


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
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap1",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }), carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap2",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }), carryingId: new UniqueEntityId('carrying-1')}));
        inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
            complement: "ap3",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }), carryingId: new UniqueEntityId('carrying-1')}));

        const result = await sut.execute({
            carryingId: 'carrying-1',
            page: 1
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            orders: expect.arrayContaining([
                expect.objectContaining({ 
                    address: expect.objectContaining({ complement: "ap1" })
                }),
                expect.objectContaining({ 
                    address: expect.objectContaining({ complement: "ap2" })
                }),
                expect.objectContaining({ 
                    address: expect.objectContaining({ complement: "ap3" })
                }),
            ]) 
        }));
    });

    it('should fetch carrying orders with pagination', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId('carrying-1'))); 

        for(let i = 1; i <= 22; i++) {
            inMemoryOrderRepository.items.push(makeOrder({address: Address.create({
                complement: `ap-${i}`,
                number: 2,
                street: "Rua",
                latitude: -27.2092052,
                longitude: -49.6401091,
            }), carryingId: new UniqueEntityId('carrying-1')}));
        }
        
        const result = await sut.execute({
            carryingId: 'carrying-1',
            page: 2
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            orders: expect.arrayContaining([
                expect.objectContaining({ address: expect.objectContaining({
                    complement: "ap-21"
                }) 
            }),
                expect.objectContaining({ address: expect.objectContaining({
                    complement: "ap-22"
                }) 
            }),
            ])
        }));
    });
    
});