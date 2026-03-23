import { makeCarrying } from "@/../tests/factories/makeCarrying";
import { InMemoryCarryingRepository } from "@/../tests/repositories/InMemoryCarryingRepository";
import { DeleteCarryingUseCase } from "./DeleteCarryingUseCase";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";


let inMemoryCarryingRepository: InMemoryCarryingRepository;
let sut: DeleteCarryingUseCase;

describe("Delete Carrying", () => {

    beforeEach(() => {
        inMemoryCarryingRepository = new InMemoryCarryingRepository();
        sut = new DeleteCarryingUseCase(inMemoryCarryingRepository);
    })

    it('should delete a carrying', async () => {
        const carrying = makeCarrying({ });
        inMemoryCarryingRepository.items.push(carrying) 

        const result = await sut.execute({
            id: carrying.id.toString()
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryCarryingRepository.items).toHaveLength(0);
    });

    it('should not delete a non-existent carrying', async () => {
        const carrying = makeCarrying({ });
        inMemoryCarryingRepository.items.push(carrying) 

        const result = await sut.execute({
            id: "non-existent-id"
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourseNotFound)
        expect(inMemoryCarryingRepository.items).toHaveLength(1);
    });
    
});