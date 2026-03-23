import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { makeCustomer } from "../../../../../../tests/factories/makeCustomer";
import { makeCarrying } from "../../../../../../tests/factories/makeCarrying";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let inMemoryCarryingRepository: InMemoryCarryingRepository;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe("Create a new order", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new CreateOrderUseCase(inMemoryOrderRepository, inMemoryCarryingRepository, inMemoryCustomerRepository);
    })

    it('should create a new order', async () => {
        const customer = makeCustomer();
        inMemoryCustomerRepository.items.push(customer)
        
        const result = await sut.execute({
            address: "fake address",
            customerId: customer.id.toString()
        });
        
        expect(result.isRight()).toBe(true);
        expect(inMemoryOrderRepository.items[0]).toEqual(expect.objectContaining({
            customerId: customer.id
        }))
    });

    it('should not create a new order with a non-existent customer', async () => {
        
        const result = await sut.execute({
            address: "fake address",
            customerId: "non-existent-id"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });

});