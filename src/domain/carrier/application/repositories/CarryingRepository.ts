import { Carrying } from "../../enterprise/entities/Carrying";

export abstract class CarryingRepository {
    abstract create(carrying: Carrying): Promise<void>;
    abstract findByCpf(cpf: string): Promise<Carrying | null>;
    abstract findById(id: string): Promise<Carrying | null>;
    abstract delete(carrying: Carrying): Promise<void>;
    abstract save(carrying: Carrying): Promise<void>;
}