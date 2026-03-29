import { HashGenerator } from "@/domain/carrier/application/cryptography/HashGenerator";
import { HashCompare } from "../../src/domain/carrier/application/cryptography/HashCompare";

export class FakeHasher implements HashCompare, HashGenerator {
    async hash(plain: string): Promise<string> {
        return `${plain}-hashed`
    }
    
    async compare(plain: string, hash: string): Promise<boolean> {
        return `${plain}-hashed` === hash;
    }
}