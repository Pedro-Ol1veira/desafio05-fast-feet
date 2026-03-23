import { UseCaseError } from "../useCaseError";

export class NotAllowed extends Error implements UseCaseError {
    constructor() {
        super(`Not Allowed`);
    }
}