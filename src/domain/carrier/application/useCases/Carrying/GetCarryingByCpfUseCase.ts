import { Either, left, right } from "@/core/either";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Carrying } from "../../../enterprise/entities/Carrying";

interface GetCarryingByCpfUseCaseRequest {
    cpf: string;
}

type GetCarryingByCpfUseCaseResponse = Either<
    ResourseNotFound,
    {
        carrying: Carrying;
    }
>

export class GetCarryingByCpfUseCase {

    constructor(
        private carryingRepository: CarryingRepository,
    ) {}

    async execute({ cpf }: GetCarryingByCpfUseCaseRequest): Promise<GetCarryingByCpfUseCaseResponse> {
        const carrying = await this.carryingRepository.findByCpf(cpf);
        
        if(!carrying) return left(new ResourseNotFound());

        return right({ carrying });
    }
}