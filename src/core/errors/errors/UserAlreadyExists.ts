import { UseCaseError } from "../useCaseError";

export class UserAlreadyExists extends Error implements UseCaseError {
    constructor(role: string) {
        super(`${role} already exists`);
    }
}