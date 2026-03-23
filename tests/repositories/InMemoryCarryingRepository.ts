import { CarryingRepository } from "../../src/domain/carrier/application/repositories/CarryingRepository";
import { Carrying } from "../../src/domain/carrier/enterprise/entities/Carrying";

export class InMemoryCarryingRepository implements CarryingRepository {
    public items: Carrying[] = [];
    
    async create(carrying: Carrying): Promise<void> {
        this.items.push(carrying);
    }
    
    async findByCpf(cpf: string): Promise<Carrying | null> {
        const carrying = this.items.find(item => item.cpf === cpf);
        
        if(!carrying) return null;
        
        return carrying;
    }
    
    async findById(id: string): Promise<Carrying | null> {
        const carrying = this.items.find(item => item.id.toString() === id);
        
        if(!carrying) return null;
        
        return carrying;
    }
    
    async delete(carrying: Carrying): Promise<void> {
        const itemIdex = this.items.findIndex(item => item.id === carrying.id);

        this.items.splice(itemIdex, 1);
    }

    async save(carrying: Carrying): Promise<void> {
        const itemIdex = this.items.findIndex(item => item.id === carrying.id);

        this.items[itemIdex] = carrying;
    }
}