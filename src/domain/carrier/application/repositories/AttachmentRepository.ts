import { Attachment } from "../../enterprise/entities/Attachment";

export abstract class AttachmentRepository {
    abstract create(attachment: Attachment): Promise<void>;
}