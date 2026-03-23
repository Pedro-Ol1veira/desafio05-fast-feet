import { Entity } from "../../../../core/entities/Entitiy";
import { UniqueEntityId } from "../../../../core/entities/UniqueEntityId";

export interface AdminProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
}

export class Admin extends Entity<AdminProps> {

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
    
    static create(props: AdminProps, id?: UniqueEntityId) {
        const admin = new Admin(props, id);
        return admin;
    }
}