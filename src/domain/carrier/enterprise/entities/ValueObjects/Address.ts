import { ValueObject } from "@/core/entities/ValueObject";

export interface AddressProps {
    latitude: number;
    longitude: number;
    street: string;
    number: number;
    complement: string;
}

export class Address extends ValueObject<AddressProps> {
    
    static create(props: AddressProps) {
        const address = new Address(props);
        return address;
    }
}