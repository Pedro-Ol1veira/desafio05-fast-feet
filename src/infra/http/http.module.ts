import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RegisterUserController } from "./controller/RegisterUser.controller";
import { CreateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/CreateCarryingUseCase";
import { CreateCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/CreateCustomerUseCase";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controller/AuthenticateAdmin.controller";
import { AuthenticateAdminUseCase } from "@/domain/carrier/application/useCases/admin/AuthenticateAdminUseCase";
import { EditUserController } from "./controller/EditUser.controller";
import { EditCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/EditCarryingUseCase";
import { EditCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/EditCustomerUseCase";


@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        RegisterUserController,
        AuthenticateController,
        EditUserController,
    ],
    providers: [
        CreateCarryingUseCase,
        CreateCustomerUseCase,
        AuthenticateAdminUseCase,
        EditCarryingUseCase,
        EditCustomerUseCase,
    ]
})
export class HttpModule {}