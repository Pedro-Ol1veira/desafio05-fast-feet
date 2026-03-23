import { Either, left, right } from "@/core/either";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";

interface DeleteCarryingUseCaseRequest {
    id: string;
}

type DeleteCarryingUseCaseResponse = Either<
    ResourseNotFound,
    {
        
    }
>

export class DeleteCarryingUseCase {

    constructor(
        private carryingRepository: CarryingRepository,
    ) {}

    async execute({ id }: DeleteCarryingUseCaseRequest): Promise<DeleteCarryingUseCaseResponse> {
        const carrying = await this.carryingRepository.findById(id);
        
        if(!carrying) return left(new ResourseNotFound());

        await this.carryingRepository.delete(carrying);

        return right({});
    }
}