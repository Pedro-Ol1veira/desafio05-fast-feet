import { UseCaseError } from "../useCaseError";

export class InvalidAttachmentType extends Error implements UseCaseError {
    constructor(type: string) {
        super(`File type ${type} is not valid`);
    }
}