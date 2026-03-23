import { CustomerRepository } from "../../src/domain/carrier/application/repositories/CustomerRepository";
import { Customer } from "../../src/domain/carrier/enterprise/entities/Customer";

export class InMemoryCustomerRepository implements CustomerRepository {
    public items: Customer[] = [];
    
    async create(customer: Customer): Promise<void> {
        this.items.push(customer);
    }
    
    async findByCpf(cpf: string): Promise<Customer | null> {
        const customer = this.items.find(item => item.cpf === cpf);
        
        if(!customer) return null;
        
        return customer;
    }
    
    async findById(id: string): Promise<Customer | null> {
        const customer = this.items.find(item => item.id.toString() === id);
        
        if(!customer) return null;
        
        return customer;
    }
    
    async delete(customer: Customer): Promise<void> {
        const itemIdex = this.items.findIndex(item => item.id === customer.id);

        this.items.splice(itemIdex, 1);
    }

    async save(customer: Customer): Promise<void> {
        const itemIdex = this.items.findIndex(item => item.id === customer.id);

        this.items[itemIdex] = customer;
    }
}