import { Either, left, right } from "@/core/either";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";

interface DeleteCustomerUseCaseRequest {
    id: string;
}

type DeleteCustomerUseCaseResponse = Either<
    ResourseNotFound,
    {
        
    }
>

export class DeleteCustomerUseCase {

    constructor(
        private customerRepository: CustomerRepository,
    ) {}

    async execute({ id }: DeleteCustomerUseCaseRequest): Promise<DeleteCustomerUseCaseResponse> {
        const customer = await this.customerRepository.findById(id);
        
        if(!customer) return left(new ResourseNotFound());

        await this.customerRepository.delete(customer);

        return right({});
    }
}