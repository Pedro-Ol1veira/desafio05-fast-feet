import { Either, left, right } from "@/core/either";
import { Carrying, CarryingProps } from "../../../enterprise/entities/Carrying";
import { HashGenerator } from "../../cryptography/HashGenerator";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";

interface CreateCarryingUseCaseRequest {
    name: string;
    cpf: string;
    email: string;
    password: string;
}

type CreateCarryingUseCaseResponse = Either<
    UserAlreadyExists,
    {
        carrying: Carrying;
    }
>

export class CreateCarryingUseCase {

    constructor(
        private carryingRepository: CarryingRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ name, cpf, email, password }: CreateCarryingUseCaseRequest): Promise<CreateCarryingUseCaseResponse> {

        const checkCarryingExists = await this.carryingRepository.findByCpf(cpf);

        if(checkCarryingExists) return left(new UserAlreadyExists("Carrying"));

        const carrying = Carrying.create({ name, email, cpf, password: await this.hashGenerator.hash(password)});

        await this.carryingRepository.create(carrying);

        return right({ carrying });
    }
}