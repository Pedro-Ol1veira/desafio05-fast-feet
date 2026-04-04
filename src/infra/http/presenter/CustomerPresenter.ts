import { Customer } from "@/domain/carrier/enterprise/entities/Customer";


export class CustomerPresenter {
    static toHTTP(customer: Customer) {
        return {
            id: customer.id.toString(),
            name: customer.name,
            email: customer.email,
            cpf: customer.cpf
        }
    }
}