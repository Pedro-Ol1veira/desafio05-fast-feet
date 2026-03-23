import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Carrying, CarryingProps } from "../../src/domain/carrier/enterprise/entities/Carrying";
import { faker } from '@faker-js/faker';

export function makeCarrying(overide: Partial<CarryingProps> = {}, id?: UniqueEntityId) {
    const newCarrying = Carrying.create({
        name: faker.person.fullName(),
        cpf: "12312312323",
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newCarrying;
}