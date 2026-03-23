import { makeCustomer } from "@/../tests/factories/makeCustomer";
import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { GetCustomerByCpfUseCase } from "./GetCustomerByCpfUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let sut: GetCustomerByCpfUseCase;

describe("Get a Customer", () => {

    beforeEach(() => {
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        sut = new GetCustomerByCpfUseCase(inMemoryCustomerRepository);
    })

    it('should get a customer', async () => {
        const customer = makeCustomer({ cpf: "12312312323"});
        inMemoryCustomerRepository.items.push(customer) 

        const result = await sut.execute({
            cpf: "12312312323"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            customer: customer
        }));
    });

    it('should not get a non-existent customer', async () => {
        const customer = makeCustomer({ cpf: "12312312323"});
        inMemoryCustomerRepository.items.push(customer) 

        const result = await sut.execute({
            cpf: "non-existent-cpf"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
    });
    
});