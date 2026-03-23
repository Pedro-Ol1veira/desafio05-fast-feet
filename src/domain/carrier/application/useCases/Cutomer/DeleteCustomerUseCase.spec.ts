import { makeCustomer } from "@/../tests/factories/makeCustomer";
import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let sut: DeleteCustomerUseCase;

describe("Delete Customer", () => {

    beforeEach(() => {
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new DeleteCustomerUseCase(inMemoryCustomerRepository);
    })

    it('should delete a customer', async () => {
        const customer = makeCustomer({ });
        inMemoryCustomerRepository.items.push(customer) 

        const result = await sut.execute({
            id: customer.id.toString()
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryCustomerRepository.items).toHaveLength(0);
    });

    it('should not delete a non-existent customer', async () => {
        const customer = makeCustomer({ });
        inMemoryCustomerRepository.items.push(customer) 

        const result = await sut.execute({
            id: "non-existent-id"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
        expect(inMemoryCustomerRepository.items).toHaveLength(1);
    });
    
});