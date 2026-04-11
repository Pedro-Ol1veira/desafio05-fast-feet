import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RegisterUserController } from "./controller/RegisterUser.controller";
import { CreateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/CreateCarryingUseCase";
import { CreateCustomerUseCase } from "@/domain/carrier/application/useCases/Cutomer/CreateCustomerUseCase";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateAdminController } from "./controller/AuthenticateAdmin.controller";
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
import { OrderPickedUpController } from "./controller/OrderPickedUp.controller";
import { OrderPickedUpUseCase } from "@/domain/carrier/application/useCases/Order/OrderPickedUpUseCase";
import { OrderDeliveredController } from "./controller/OrderDelivered.controller";
import { OrderDeliveredUseCase } from "@/domain/carrier/application/useCases/Order/OrderDeliveredUseCase";
import { ReturnedOrderController } from "./controller/ReturnedOrder.controller";
import { ReturnedOrderUseCase } from "@/domain/carrier/application/useCases/Order/ReturnedOrderUseCase";
import { AuthenticateCarryingController } from "./controller/AuthenticateCarrying.controller";
import { AuthenticateCarryingUseCase } from "@/domain/carrier/application/useCases/Carrying/AuthenticateCarryingUseCase";
import { FetchCarryingOrdersController } from "./controller/FetchCarryingOrders.controller";
import { FetchCarryingOrdersUseCase } from "@/domain/carrier/application/useCases/Carrying/FetchCarryingOrdersUseCase";
import { FindManyNearByController } from "./controller/FindManyNearBy.controller";
import { FindManyOrdersNearByUseCase } from "@/domain/carrier/application/useCases/Carrying/FindManyOrdersNearByUseCase";


@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        RegisterUserController,
        AuthenticateAdminController,
        EditUserController,
        DeleteUserController,
        GetUserController,
        CreateOrderController,
        EditOrderController,
        GetOrderByIdController,
        DeleteOrderController,
        OrderWaitingController,
        OrderPickedUpController,
        OrderDeliveredController,
        ReturnedOrderController,
        AuthenticateCarryingController,
        FindManyNearByController,
        FetchCarryingOrdersController,
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
        OrderPickedUpUseCase,
        OrderDeliveredUseCase,
        ReturnedOrderUseCase,
        AuthenticateCarryingUseCase,
        FetchCarryingOrdersUseCase,
        FindManyOrdersNearByUseCase
    ]
})
export class HttpModule {}