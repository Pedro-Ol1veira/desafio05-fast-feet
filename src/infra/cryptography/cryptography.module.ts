import { HashCompare } from "@/domain/carrier/application/cryptography/HashCompare";
import { Module } from "@nestjs/common";
import { BcryptHasher } from "./BcryptHasher";
import { HashGenerator } from "@/domain/carrier/application/cryptography/HashGenerator";


@Module({
    providers: [
        { provide: HashCompare, useClass: BcryptHasher },
        { provide: HashGenerator, useClass: BcryptHasher }
    ],
    exports: [
        HashGenerator,
        HashCompare,
    ]
})
export class CryptographyModule {}