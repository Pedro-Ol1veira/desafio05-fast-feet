import { UseCaseError } from "../useCaseError";

export class WrongCredentials extends Error implements UseCaseError {
    constructor() {
        super("Invalid Credentials");
    }
}