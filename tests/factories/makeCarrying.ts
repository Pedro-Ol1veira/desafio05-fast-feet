import { CarryingProps, Carrying } from "@/domain/carrier/enterprise/entities/Carrying";
import { PrismaCarryingMapper } from "@/infra/database/prisma/mappers/PrismaCarryingMapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { faker } from '@faker-js/faker/locale/pt_BR';

export function makeCarrying(overide: Partial<CarryingProps> = {}, id?: UniqueEntityId) {
    const newCarrying = Carrying.create({
        name: faker.person.fullName(),
        cpf: faker.string.numeric('###.###.###-##'),
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newCarrying;
}

@Injectable()
export class CarryingFactory {
    constructor(private prisma: PrismaService) {}

    async makePrismaCarrying(data: Partial<CarryingProps> = {}): Promise<Carrying> {
        const carrying = makeCarrying(data);

        await this.prisma.user.create({
            data: {
                ...PrismaCarryingMapper.toPrisma(carrying),
                role: 'CARRYING'
            }
        });

        return carrying;
    }
}