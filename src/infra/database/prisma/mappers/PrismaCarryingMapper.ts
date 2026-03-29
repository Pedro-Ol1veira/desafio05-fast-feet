import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Carrying } from "@/domain/carrier/enterprise/entities/Carrying";
import { Prisma } from "prisma/generated/client";
import { User as PrismaUser } from 'prisma/generated/client';

export class PrismaCarryingMapper {

    static toDomain(raw: PrismaUser): Carrying {
        return Carrying.create({
            cpf: raw.cpf,
            email: raw.email,
            name: raw.name,
            password: raw.password
        }, new UniqueEntityId(raw.id));
    }

    static toPrisma(carrying: Carrying): Prisma.UserUncheckedCreateInput {
        return {
            id: carrying.id.toString(),
            cpf: carrying.cpf,
            email: carrying.email,
            name: carrying.email,
            password: carrying.password
        }
    }
}