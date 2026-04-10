import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { InMemoryOrderRepository } from "../../../../../../tests/repositories/InMemoryOrderRepository";
import { makeCustomer } from "../../../../../../tests/factories/makeCustomer";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe("Create a new order", () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new CreateOrderUseCase(inMemoryOrderRepository, inMemoryCustomerRepository);
    })

    it('should create a new order', async () => {
        const customer = makeCustomer();
        inMemoryCustomerRepository.items.push(customer)
        
        const result = await sut.execute({
            complement: "ap100",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
            customerId: customer.id.toString()
        });
        
        expect(result.isRight()).toBe(true);
        expect(inMemoryOrderRepository.items[0]).toEqual(expect.objectContaining({
            customerId: customer.id
        }))
    });

    it('should not create a new order with a non-existent customer', async () => {
        
        const result = await sut.execute({
            complement: "ap100",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
            customerId: "non-existent-id"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });

});