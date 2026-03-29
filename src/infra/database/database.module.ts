import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CarryingRepository } from "@/domain/carrier/application/repositories/CarryingRepository";
import { PrismaCarryngRepository } from "./prisma/repositories/PrismaCarryingRepository";
import { CustomerRepository } from "@/domain/carrier/application/repositories/CustomerRepository";
import { PrismaCustomerRepository } from "./prisma/repositories/PrismaCustomerRepository";



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
        }
    ],
    exports: [
        PrismaService,
        CarryingRepository,
        CustomerRepository,
    ]
})
export class DatabaseModule {}