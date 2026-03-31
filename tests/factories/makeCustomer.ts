import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Customer, CustomerProps } from "../../src/domain/carrier/enterprise/entities/Customer";
import { faker } from '@faker-js/faker/locale/pt_BR';

export function makeCustomer(overide: Partial<CustomerProps> = {}, id?: UniqueEntityId) {
    const newCustomer = Customer.create({
        name: faker.person.fullName(),
        cpf: faker.string.numeric('###.###.###-##'),
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newCustomer;
}