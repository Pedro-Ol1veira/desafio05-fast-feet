import { Admin } from "../../enterprise/entities/Admin";

export abstract class AdminRepository {
    abstract findByCpf(cpf: string): Promise<Admin | null>;
}