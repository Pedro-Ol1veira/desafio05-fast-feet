import { Entity } from "../../../../core/entities/Entitiy";
import { UniqueEntityId } from "../../../../core/entities/UniqueEntityId";

export interface AddressProps {
    latitude: number;
    longitude: number;
    street: string;
    number: number;
    complement: string;
}

export class Address extends Entity<AddressProps> {
    
    static create(props: AddressProps, id?: UniqueEntityId) {
        const address = new Address(props, id);
        return address;
    }
}