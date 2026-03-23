import { Either, left, right } from "@/core/either";
import { Customer } from "../../../enterprise/entities/Customer";
import { HashGenerator } from "../../cryptography/HashGenerator";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";

interface EditCustomerUseCaseRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

type EditCustomerUseCaseResponse = Either<
    ResourseNotFound,
    {
        customer: Customer;
    }
>

export class EditCustomerUseCase {

    constructor(
        private customerRepository: CustomerRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ name, email, password, id }: EditCustomerUseCaseRequest): Promise<EditCustomerUseCaseResponse> {

        const customer = await this.customerRepository.findById(id);

        if(!customer) return left(new ResourseNotFound());

        customer.name = name;
        customer.email = email;
        customer.password = await this.hashGenerator.hash(password);

        await this.customerRepository.save(customer);

        return right({ customer });
    }
}