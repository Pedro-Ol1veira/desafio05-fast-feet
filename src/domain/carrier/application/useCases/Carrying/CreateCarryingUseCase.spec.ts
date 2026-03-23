import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { CreateCarryingUseCase } from "./CreateCarryingUseCase";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";


let inMemoryCarryingRepository: InMemoryCarryingRepository;
let fakeHasher: FakeHasher;
let sut: CreateCarryingUseCase;

describe("Create Carrying", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        fakeHasher = new FakeHasher();
        sut = new CreateCarryingUseCase(inMemoryCarryingRepository, fakeHasher);
    })

    it('should create a new carrying', async () => {
        const result = await sut.execute({
            name: "Teste",
            cpf: "12312312312",
            email: "teste@gmail.com",
            password: "123456"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            carrying: inMemoryCarryingRepository.items[0]
        });
    });
    
    it('should not create a new carrying with a existent cpf', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({ cpf: "12312312323" }));
        
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
        expect(inMemoryCarryingRepository.items[0]).toEqual(expect.objectContaining({
            password: "123456-hashed"
        }));
    });
    
});