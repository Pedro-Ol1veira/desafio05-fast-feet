import { Either, left, right } from "@/core/either";
import { Carrying, CarryingProps } from "../../../enterprise/entities/Carrying";
import { HashGenerator } from "../../cryptography/HashGenerator";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";

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