import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeCustomer } from "@/../tests/factories/makeCustomer";
import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { EditCustomerUseCase } from "./EditCustomerUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let fakeHasher: FakeHasher;
let sut: EditCustomerUseCase;

describe("Editing Customer", () => {

    beforeEach(() => {
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        fakeHasher = new FakeHasher();
        sut = new EditCustomerUseCase(inMemoryCustomerRepository, fakeHasher);
    })

    it('should edit a customer', async () => {
        const customer = makeCustomer({
            name: "teste",
            password: "123456",
            cpf: "12312312312",
            email: "teste@gmail.com"
        });
        inMemoryCustomerRepository.items.push(customer);
        
        const result = await sut.execute({
            id: customer.id.toString(),
            name: "New name",
            email: "newEmail@gmail.com",
            password: "123456789"
        });

        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            customer: expect.objectContaining({
                name: "New name",
                email: "newEmail@gmail.com",
                password: await fakeHasher.hash("123456789")
            })
        });
    });

    it('should not edit a non-existent customer', async () => {
        const customer = makeCustomer();
        inMemoryCustomerRepository.items.push(customer);
        
        const result = await sut.execute({
            id: "non-existent-id",
            name: "New name",
            email: "newEmail@gmail.com",
            password: "123456789"
        });

        
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound);
    });
    
    
});