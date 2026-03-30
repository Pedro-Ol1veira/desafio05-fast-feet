import { Either, left, right } from "@/core/either";
import { AdminRepository } from "../../repositories/AdminRepository";
import { Injectable } from "@nestjs/common";
import { Encrypter } from "../../cryptography/Encrypter";
import { HashCompare } from "../../cryptography/HashCompare";
import { WrongCredentials } from "@/core/errors/errors/WrongCredentials";

interface AuthenticateAdminUseCaseRequest {
    cpf: string;
    password: string;
}

type AuthenticateAdminUseCaseResponse = Either<
    WrongCredentials,
    {
        accessToken: string;
    }
>

@Injectable()
export class AuthenticateAdminUseCase {

    constructor(
        private AdminRepository: AdminRepository,
        private encrypter: Encrypter,
        private hashCompare: HashCompare,
    ) {}

    async execute({ cpf, password }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {

        const admin = await this.AdminRepository.findByCpf(cpf);
        if(!admin) return left(new WrongCredentials());

        const checkPassword = await this.hashCompare.compare(password, admin.password);
        if(!checkPassword) return left(new WrongCredentials());

        const accessToken = await this.encrypter.encrypt({ sub: admin.id.toString() });
        
        return right({ accessToken });
    }
}