import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Carrying, CarryingProps } from "../../src/domain/carrier/enterprise/entities/Carrying";
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