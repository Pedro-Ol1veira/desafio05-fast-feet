import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Admin, AdminProps } from "../../src/domain/carrier/enterprise/entities/Admin";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaAdminMapper } from "@/infra/database/prisma/mappers/PrismaAdminMapper";

export function makeAdmin(overide: Partial<AdminProps> = {}, id?: UniqueEntityId) {
    const newAdmin = Admin.create({
        name: faker.person.fullName(),
        cpf: faker.string.numeric('###.###.###-##'),
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newAdmin;
}

@Injectable()
export class AdminFactory {
    constructor(private prisma: PrismaService) {}

    async makePrismaAdmin(data: Partial<AdminProps> = {}): Promise<Admin> {
        const admin = makeAdmin(data);

        await this.prisma.user.create({
            data: {
                ...PrismaAdminMapper.toPrisma(admin),
                role: 'ADMIN'
            }
        });

        return admin;
    }
}