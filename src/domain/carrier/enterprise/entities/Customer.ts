import { Entity } from "../../../../core/entities/Entitiy";
import { UniqueEntityId } from "../../../../core/entities/UniqueEntityId";

export interface CustomerProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
}

export class Customer extends Entity<CustomerProps> {

    get name() {
        return this.props.name;
    }

    get cpf() {
        return this.props.cpf;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }
    
    set name(newName: string) {
        this.props.name = newName;
    }

    set email(newEmail: string) {
        this.props.email = newEmail;
    }

    set password(newPassword: string) {
        this.props.password = newPassword;
    }
    
    static create(props: CustomerProps, id?: UniqueEntityId) {
        const customer = new Customer(props, id);

        return customer;
    }
}