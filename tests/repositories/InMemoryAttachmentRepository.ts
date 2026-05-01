import { AttachmentRepository } from "@/domain/carrier/application/repositories/AttachmentRepository";
import { Attachment } from "@/domain/carrier/enterprise/entities/Attachment";


export class InMemoryAttachmentRepository extends AttachmentRepository {

    public items: Attachment[] = [];
    
    async create(attachment: Attachment): Promise<void> {
        this.items.push(attachment);
    }

    async findById(id: string): Promise<Attachment | null> {
        const attachment = this.items.find(item => item.id.toString() === id);
        if(!attachment) return null;

        return attachment;
    }
}