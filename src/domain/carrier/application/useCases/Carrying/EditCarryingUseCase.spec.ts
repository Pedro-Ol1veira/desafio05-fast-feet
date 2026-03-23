import { FakeHasher } from "@/../tests/cryptography/HashCompare";
import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { EditCarryingUseCase } from "./EditCarryingUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCarryingRepository: InMemoryCarryingRepository;
let fakeHasher: FakeHasher;
let sut: EditCarryingUseCase;

describe("Editing Carrying", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        fakeHasher = new FakeHasher();
        sut = new EditCarryingUseCase(inMemoryCarryingRepository, fakeHasher);
    })

    it('should edit a carrying', async () => {
        const carrying = makeCarrying({
            name: "teste",
            password: "123456",
            cpf: "12312312312",
            email: "teste@gmail.com"
        });
        inMemoryCarryingRepository.items.push(carrying);
        
        const result = await sut.execute({
            id: carrying.id.toString(),
            name: "New name",
            email: "newEmail@gmail.com",
            password: "123456789"
        });

        
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            carrying: expect.objectContaining({
                name: "New name",
                email: "newEmail@gmail.com",
                password: await fakeHasher.hash("123456789")
            })
        });
    });

    it('should not edit a non-existent carrying', async () => {
        const carrying = makeCarrying();
        inMemoryCarryingRepository.items.push(carrying);
        
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