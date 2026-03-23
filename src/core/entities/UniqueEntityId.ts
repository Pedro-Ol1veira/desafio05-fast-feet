import { randomUUID } from 'node:crypto';

export class UniqueEntityId {

    private value;

    constructor(id?: string) {
        this.value = id ?? randomUUID()
    }

    public toString() {
        return this.value;
    }

    public equals(value: UniqueEntityId) {
        return value.toString() == this.value;
    }
}