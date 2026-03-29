import { UniqueEntityId } from "../../src/core/entities/UniqueEntityId";
import { Admin, AdminProps } from "../../src/domain/carrier/enterprise/entities/Admin";
import { faker } from '@faker-js/faker';

export function makeAdmin(overide: Partial<AdminProps> = {}, id?: UniqueEntityId) {
    const newAdmin = Admin.create({
        name: faker.person.fullName(),
        cpf: "12312312323",
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...overide
    }, id);

    return newAdmin;
}