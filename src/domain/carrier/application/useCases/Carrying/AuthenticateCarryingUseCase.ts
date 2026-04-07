import { Either, left, right } from "@/core/either";
import { CarryingRepository } from "../../repositories/CarryingRepository";
import { Injectable } from "@nestjs/common";
import { Encrypter } from "../../cryptography/Encrypter";
import { HashCompare } from "../../cryptography/HashCompare";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";

interface AuthenticateCarryingUseCaseRequest {
    cpf: string;
    password: string;
}

type AuthenticateCarryingUseCaseResponse = Either<
    WrongCredentials,
    {
        accessToken: string;
    }
>

@Injectable()
export class AuthenticateCarryingUseCase {

    constructor(
        private CarryingRepository: CarryingRepository,
        private encrypter: Encrypter,
        private hashCompare: HashCompare,
    ) {}

    async execute({ cpf, password }: AuthenticateCarryingUseCaseRequest): Promise<AuthenticateCarryingUseCaseResponse> {

        const carrying = await this.CarryingRepository.findByCpf(cpf);
        if(!carrying) return left(new WrongCredentials());

        const checkPassword = await this.hashCompare.compare(password, carrying.password);
        if(!checkPassword) return left(new WrongCredentials());

        const accessToken = await this.encrypter.encrypt({ sub: carrying.id.toString(), role: 'CARRYING' });
        
        return right({ accessToken });
    }
}