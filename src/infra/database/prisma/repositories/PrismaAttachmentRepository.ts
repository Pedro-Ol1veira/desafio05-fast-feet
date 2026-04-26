import { AttachmentRepository } from "@/domain/carrier/application/repositories/AttachmentRepository";
import { Attachment } from "@/domain/carrier/enterprise/entities/Attachment";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAttachmentMapper } from "../mappers/PrismaAttachmentMapper";

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {

    constructor(private prisma: PrismaService) {}
    
    async create(attachment: Attachment): Promise<void> {
        const data = PrismaAttachmentMapper.toPrisma(attachment);

        await this.prisma.attachment.create({
            data,
        });
    }

}