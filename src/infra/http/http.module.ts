import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RegisterUserController } from "./controller/RegisterUser.controller";
import { CreateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/CreateCarryingUseCase";
import { CreateCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/CreateCustomerUseCase";
import { CryptographyModule } from "../cryptography/cryptography.module";


@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        RegisterUserController,
    ],
    providers: [
        CreateCarryingUseCase,
        CreateCustomerUseCase,
    ]
})
export class HttpModule {}