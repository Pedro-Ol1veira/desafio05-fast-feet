import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { AuthenticateCarryingUseCase } from "./AuthenticateCarryingUseCase";
import { FakeEncrypter } from "tests/cryptography/FakeEncrypter";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";


let inMemoryCarryingRepository: InMemoryCarryingRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateCarryingUseCase;

describe("Authenticate Carrying", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        fakeHasher = new FakeHasher();
        fakeEncrypter = new FakeEncrypter();
        sut = new AuthenticateCarryingUseCase(inMemoryCarryingRepository, fakeEncrypter, fakeHasher);
    })

    
    it('should authenticate an carrying', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312323",
            password: "123456"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            accessToken: expect.any(String)
        })
    });

    it('should not authenticate an carrying with wrong cpf', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312324",
            password: "123456"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(WrongCredentials);
    });

    it('should not authenticate an carrying with wrong password', async () => {
        inMemoryCarryingRepository.items.push(makeCarrying({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312323",
            password: "1234567"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(WrongCredentials)
    });

    
});