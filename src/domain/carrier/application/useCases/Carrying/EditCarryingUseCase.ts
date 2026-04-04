import { Either, left, right } from "@/core/either";
import { Carrying } from "../../../enterprise/entities/Carrying";
import { HashGenerator } from "../../cryptography/HashGenerator";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Injectable } from "@nestjs/common";

interface EditCarryingUseCaseRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

type EditCarryingUseCaseResponse = Either<
    ResourseNotFound,
    {
        carrying: Carrying;
    }
>

@Injectable()
export class EditCarryingUseCase {

    constructor(
        private carryingRepository: CarryingRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ name, email, password, id }: EditCarryingUseCaseRequest): Promise<EditCarryingUseCaseResponse> {

        const carrying = await this.carryingRepository.findById(id);

        if(!carrying) return left(new ResourseNotFound());

        carrying.name = name;
        carrying.email = email;
        carrying.password = await this.hashGenerator.hash(password);

        await this.carryingRepository.save(carrying);

        return right({ carrying });
    }
}