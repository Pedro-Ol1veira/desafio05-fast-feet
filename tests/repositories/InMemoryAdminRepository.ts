import { AdminRepository } from "../../src/domain/carrier/application/repositories/AdminRepository";
import { Admin } from "../../src/domain/carrier/enterprise/entities/Admin";

export class InMemoryAdminRepository implements AdminRepository {
    public items: Admin[] = [];
    
    async findByCpf(cpf: string): Promise<Admin | null> {
        const admin = this.items.find(item => item.cpf === cpf);
        
        if(!admin) return null;
        
        return admin;
    }
    
}