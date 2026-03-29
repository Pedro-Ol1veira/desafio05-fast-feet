import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeAdmin } from "@/../tests/factories/makeAdmin";
import { InMemoryAdminRepository } from "@/../tests/repositories/InMemoryAdminRepository";
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase";
import { FakeEncrypter } from "tests/cryptography/FakeEncrypter";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";


let inMemoryAdminRepository: InMemoryAdminRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateAdminUseCase;

describe("Authenticate Admin", () => {

    beforeEach(() => {
        inMemoryAdminRepository = new InMemoryAdminRepository();
        fakeHasher = new FakeHasher();
        fakeEncrypter = new FakeEncrypter();
        sut = new AuthenticateAdminUseCase(inMemoryAdminRepository, fakeEncrypter, fakeHasher);
    })

    
    it('should authenticate an admin', async () => {
        inMemoryAdminRepository.items.push(makeAdmin({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312323",
            password: "123456"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            accessToken: expect.any(String)
        })
    });

    it('should not authenticate an admin with wrong cpf', async () => {
        inMemoryAdminRepository.items.push(makeAdmin({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312324",
            password: "123456"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(WrongCredentials);
    });

    it('should not authenticate an admin with wrong password', async () => {
        inMemoryAdminRepository.items.push(makeAdmin({ cpf: "12312312323", password: await fakeHasher.hash("123456") }));
        
        const result = await sut.execute({
            cpf: "12312312323",
            password: "1234567"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(WrongCredentials)
    });

    
});