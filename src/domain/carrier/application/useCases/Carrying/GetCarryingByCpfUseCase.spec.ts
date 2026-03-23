import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { GetCarryingByCpfUseCase } from "./GetCarryingByCpfUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCarryingRepository: InMemoryCarryingRepository;
let sut: GetCarryingByCpfUseCase;

describe("Get a Carrying", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        sut = new GetCarryingByCpfUseCase(inMemoryCarryingRepository);
    })

    it('should get a carrying', async () => {
        const carrying = makeCarrying({ cpf: "12312312323"});
        inMemoryCarryingRepository.items.push(carrying) 

        const result = await sut.execute({
            cpf: "12312312323"
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual(expect.objectContaining({
            carrying: carrying
        }));
    });

    it('should not get a non-existent carrying', async () => {
        const carrying = makeCarrying({ cpf: "12312312323"});
        inMemoryCarryingRepository.items.push(carrying) 

        const result = await sut.execute({
            cpf: "non-existent-cpf"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
    });
    
});