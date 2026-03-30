import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Admin } from "@/domain/carrier/enterprise/entities/Admin";
import { Prisma } from "prisma/generated/client";
import { User as PrismaUser } from 'prisma/generated/client';

export class PrismaAdminMapper {

    static toDomain(raw: PrismaUser): Admin {
        return Admin.create({
            cpf: raw.cpf,
            email: raw.email,
            name: raw.name,
            password: raw.password
        }, new UniqueEntityId(raw.id));
    }

    static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
        return {
            id: admin.id.toString(),
            cpf: admin.cpf,
            email: admin.email,
            name: admin.email,
            password: admin.password
        }
    }
}