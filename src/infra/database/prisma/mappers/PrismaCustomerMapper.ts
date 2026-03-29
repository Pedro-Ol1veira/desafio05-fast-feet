import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Customer } from "@/domain/carrier/enterprise/entities/Customer";
import { Prisma } from "prisma/generated/client";
import { User as PrismaUser } from 'prisma/generated/client';

export class PrismaCustomerMapper {

    static toDomain(raw: PrismaUser): Customer {
        return Customer.create({
            cpf: raw.cpf,
            email: raw.email,
            name: raw.name,
            password: raw.password
        }, new UniqueEntityId(raw.id));
    }

    static toPrisma(Customer: Customer): Prisma.UserUncheckedCreateInput {
        return {
            id: Customer.id.toString(),
            cpf: Customer.cpf,
            email: Customer.email,
            name: Customer.email,
            password: Customer.password
        }
    }
}