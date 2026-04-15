import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CarryingRepository } from "@/domain/carrier/application/repositories/CarryingRepository";
import { PrismaCarryngRepository } from "./prisma/repositories/PrismaCarryingRepository";
import { CustomerRepository } from "@/domain/carrier/application/repositories/CustomerRepository";
import { PrismaCustomerRepository } from "./prisma/repositories/PrismaCustomerRepository";
import { AdminRepository } from "@/domain/carrier/application/repositories/AdminRepository";
import { PrismaAdminRepository } from "./prisma/repositories/PrismaAdminRepository";
import { OrderRepository } from "@/domain/carrier/application/repositories/OrderRepository";
import { PrismaOrderRepository } from "./prisma/repositories/PrismaOrderRepository";
import { NotificationRepository } from "@/domain/notification/application/repositories/NotificationRepository";
import { PrismaNotificationRepository } from "./prisma/repositories/PrismaNotificationRepository";



@Module({
    providers: [
        PrismaService,
        {
            provide: CarryingRepository,
            useClass: PrismaCarryngRepository
        },
        {
            provide: CustomerRepository,
            useClass: PrismaCustomerRepository
        },
        {
            provide: AdminRepository,
            useClass: PrismaAdminRepository
        },
        {
            provide: OrderRepository,
            useClass: PrismaOrderRepository,
        },

        {
            provide: NotificationRepository,
            useClass: PrismaNotificationRepository,
        }
    ],
    exports: [
        PrismaService,
        CarryingRepository,
        CustomerRepository,
        AdminRepository,
        OrderRepository,
        NotificationRepository,
    ]
})
export class DatabaseModule {}