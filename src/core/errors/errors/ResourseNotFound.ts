import { UseCaseError } from "../useCaseError";

export class ResourseNotFound extends Error implements UseCaseError {
    constructor() {
        super(`Resourse Not Found`);
    }
}