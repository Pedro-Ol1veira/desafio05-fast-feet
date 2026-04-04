import { Either, left, right } from "@/core/either";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Carrying } from "../../../enterprise/entities/Carrying";
import { Injectable } from "@nestjs/common";

interface GetCarryingByCpfUseCaseRequest {
    cpf: string;
}

type GetCarryingByCpfUseCaseResponse = Either<
    ResourseNotFound,
    {
        carrying: Carrying;
    }
>

@Injectable()
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