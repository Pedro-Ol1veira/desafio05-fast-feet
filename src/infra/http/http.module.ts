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
import { DeleteCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/DeleteCarryingUseCase";
import { DeleteCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/DeleteCustomerUseCase";
import { DeleteUserController } from "./controller/DeleteUser.controller";
import { GetCarryingByCpfUseCase } from "@/domain/carrier/application/useCases/Carrying/GetCarryingByCpfUseCase";
import { GetCustomerByCpfUseCase } from "@/domain/carrier/application/useCases/Cutomer/GetCustomerByCpfUseCase";
import { GetUserController } from "./controller/GetUser.controller";
import { CreateOrderController } from "./controller/CreateOrder.controller";
import { CreateOrderUseCase } from "@/domain/carrier/application/useCases/Order/CreateOrderUseCase";
import { EditOrderController } from "./controller/EditOrder.controller";
import { EditOrderUseCase } from "@/domain/carrier/application/useCases/Order/EditOrderUseCase";
import { GetOrderByIdController } from "./controller/GetOrder.controller";
import { GetOrderByIdUseCase } from "@/domain/carrier/application/useCases/Order/GetOrderByIdUseCase";
import { DeleteOrderController } from "./controller/DeleteOrder.controller";
import { DeleteOrderUseCase } from "@/domain/carrier/application/useCases/Order/DeleteOrderUseCase";
import { OrderWaitingController } from "./controller/OrderWaiting.controller";
import { OrderWaitingUseCase } from "@/domain/carrier/application/useCases/Order/OrderWaitingUseCase";


@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        RegisterUserController,
        AuthenticateController,
        EditUserController,
        DeleteUserController,
        GetUserController,
        CreateOrderController,
        EditOrderController,
        GetOrderByIdController,
        DeleteOrderController,
        OrderWaitingController,
    ],
    providers: [
        CreateCarryingUseCase,
        CreateCustomerUseCase,
        AuthenticateAdminUseCase,
        EditCarryingUseCase,
        EditCustomerUseCase,
        DeleteCarryingUseCase,
        DeleteCustomerUseCase,
        GetCarryingByCpfUseCase,
        GetCustomerByCpfUseCase,
        CreateOrderUseCase,
        EditOrderUseCase,
        GetOrderByIdUseCase,
        DeleteOrderUseCase,
        OrderWaitingUseCase,
    ]
})
export class HttpModule {}