import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Customer, CustomerProps } from "../../src/domain/carrier/enterprise/entities/Customer";
import { faker } from '@faker-js/faker';

export function makeCustomer(overide: Partial<CustomerProps> = {}, id?: UniqueEntityId) {
    const newCustomer = Customer.create({
        name: faker.person.fullName(),
        cpf: "12312312323",
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newCustomer;
}