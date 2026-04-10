import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { makeCustomer } from "../../../../../../tests/factories/makeCustomer";
import { makeCarrying } from "../../../../../../tests/factories/makeCarrying";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { EditOrderUseCase } from "./EditOrderUseCase";
import { makeOrder } from "../../../../../../tests/factories/makeOrder";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let inMemoryCarryingRepository: InMemoryCarryingRepository;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: EditOrderUseCase;

describe("Edit a new order", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new EditOrderUseCase(inMemoryOrderRepository, inMemoryCarryingRepository, inMemoryCustomerRepository);
    })

    it('should edit an order', async () => {
        
        const order = makeOrder();
        inMemoryOrderRepository.items.push(order);
        inMemoryCarryingRepository.items.push(makeCarrying({}, new UniqueEntityId("carrying-1"))); 
        inMemoryCustomerRepository.items.push(makeCustomer({}, new UniqueEntityId("customer-1"))) 

        const result = await sut.execute({
            complement: "ap100",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
            carryingId: "carrying-1",
            customerId: "customer-1",
            orderId: order.id.toString(),
        });
        
        expect(result.isRight()).toBe(true);
        expect(inMemoryOrderRepository.items[0]).toEqual(expect.objectContaining({
            carryingId: new UniqueEntityId("carrying-1"),
            customerId: new UniqueEntityId("customer-1")
        }));
    });

    it('should not edit a non-existent order', async () => {
        
        const result = await sut.execute({
            complement: "ap100",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
            carryingId: "carrying-1",
            customerId: "customer-1",
            orderId: "non-existent-id",
        });
        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });
    
});