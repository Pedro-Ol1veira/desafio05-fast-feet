import { HashCompare } from "@/domain/carrier/application/cryptography/HashCompare";
import { Injectable } from "@nestjs/common";
import { HashGenerator } from "tests/cryptography/HashGenerator";
import { hash, compare } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenerator, HashCompare {

    hash(plain: string): Promise<string> {
        return hash(plain, 8);
    }
    compare(plain: string, hash: string): Promise<boolean> {
        return compare(plain, hash);
    }

}