import { Customer } from "../../enterprise/entities/Customer";

export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<void>;
    abstract findByCpf(cpf: string): Promise<Customer | null>;
    abstract findById(id: string): Promise<Customer | null>;
    abstract delete(customer: Customer): Promise<void>;
    abstract save(customer: Customer): Promise<void>;
}