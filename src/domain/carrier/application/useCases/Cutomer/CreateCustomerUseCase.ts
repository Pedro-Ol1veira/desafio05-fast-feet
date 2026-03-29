import { Either, left, right } from "@/core/either";
import { Customer, CustomerProps } from "../../../enterprise/entities/Customer";
import { HashGenerator } from "../../cryptography/HashGenerator";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { UserAlreadyExists } from "@/core/errors/errors/UserAlreadyExists";
import { Injectable } from "@nestjs/common";

interface CreateCustomerUseCaseRequest {
    name: string;
    cpf: string;
    email: string;
    password: string;
}

type CreateCustomerUseCaseResponse = Either<
    UserAlreadyExists,
    {
        customer: Customer;
    }
>

@Injectable()
export class CreateCustomerUseCase {

    constructor(
        private customerRepository: CustomerRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ name, cpf, email, password }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {

        const checkCustomerExists = await this.customerRepository.findByCpf(cpf);

        if(checkCustomerExists) return left(new UserAlreadyExists("Customer"));

        const customer = Customer.create({ name, email, cpf, password: await this.hashGenerator.hash(password)});

        await this.customerRepository.create(customer);

        return right({ customer });
    }
}