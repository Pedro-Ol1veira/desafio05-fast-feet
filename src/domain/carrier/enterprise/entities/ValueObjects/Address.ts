import { ValueObject } from "@/core/entities/ValueObject";

export interface AddressProps {
    latitude: number;
    longitude: number;
    street: string;
    number: number;
    complement: string;
}

export class Address extends ValueObject<AddressProps> {
    
    get latitude() {
        return this.props.latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    get street() {
        return this.props.street;
    }
    get number() {
        return this.props.number;
    }
    get complement() {
        return this.props.complement;
    }

    
    
    static create(props: AddressProps) {
        const address = new Address(props);
        return address;
    }
}