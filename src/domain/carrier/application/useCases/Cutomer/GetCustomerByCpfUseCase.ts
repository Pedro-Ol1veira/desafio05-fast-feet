import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { Customer } from "../../../enterprise/entities/Customer";

interface GetCustomerByCpfUseCaseRequest {
    cpf: string;
}

type GetCustomerByCpfUseCaseResponse = Either<
    ResourseNotFound,
    {
        customer: Customer;
    }
>

export class GetCustomerByCpfUseCase {

    constructor(
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ cpf }: GetCustomerByCpfUseCaseRequest): Promise<GetCustomerByCpfUseCaseResponse> {
        const customer = await this.customerRepository.findByCpf(cpf);
        
        if(!customer) return left(new ResourseNotFound());

        return right({ customer });
    }
}