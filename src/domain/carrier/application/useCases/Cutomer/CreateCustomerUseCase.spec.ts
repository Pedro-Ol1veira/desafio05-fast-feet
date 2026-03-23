import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeCustomer } from "@/../tests/factories/makeCustomer";
import { InMemoryCustomerRepository } from "@/../tests/repositories/InMemoryCustomerRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";


let inMemoryCustomerRepository: InMemoryCustomerRepository;
let fakeHasher: FakeHasher;
let sut: CreateCustomerUseCase;

describe("Create Customer", () => {

    beforeEach(() => {
        inMemoryCustomerRepository = new InMemoryCustomerRepository();
        fakeHasher = new FakeHasher();
        sut = new CreateCustomerUseCase(inMemoryCustomerRepository, fakeHasher);
    })

    it('should create a new customer', async () => {
        const result = await sut.execute({
            name: "Teste",
            cpf: "12312312312",
            email: "teste@gmail.com",
            password: "123456"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            customer: inMemoryCustomerRepository.items[0]
        });
    });
    
    it('should not create a new customer with a existent cpf', async () => {
        inMemoryCustomerRepository.items.push(makeCustomer({ cpf: "12312312323" }));
        
        const result = await sut.execute({
            name: "Teste",
            cpf: "12312312323",
            email: "teste@gmail.com",
            password: "123456"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(UserAlreadyExists);
        
    })

    it('should encrypt password', async () => {
        const result = await sut.execute({
            name: "Teste",
            cpf: "12312312312",
            email: "teste@gmail.com",
            password: "123456"
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryCustomerRepository.items[0]).toEqual(expect.objectContaining({
            password: "123456-hashed"
        }));
    });
    
});