import { HashCompare } from "@/domain/carrier/application/cryptography/HashCompare";
import { Module } from "@nestjs/common";
import { BcryptHasher } from "./BcryptHasher";
import { HashGenerator } from "@/domain/carrier/application/cryptography/HashGenerator";
import { Encrypter } from "@/domain/carrier/application/cryptography/Encrypter";
import { JwtEncrypter } from "./JwtEncrypter";


@Module({
    providers: [
        { provide: HashCompare, useClass: BcryptHasher },
        { provide: HashGenerator, useClass: BcryptHasher },
        { provide: Encrypter, useClass: JwtEncrypter }
    ],
    exports: [
        HashGenerator,
        HashCompare,
        Encrypter,
    ]
})
export class CryptographyModule {}