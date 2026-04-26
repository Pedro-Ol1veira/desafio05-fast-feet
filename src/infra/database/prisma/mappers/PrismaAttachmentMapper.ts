import { Attachment } from "@/domain/carrier/enterprise/entities/Attachment";
import { Prisma } from "prisma/generated/client";

export class PrismaAttachmentMapper {
    static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
        return {
            id: attachment.id.toString(),
            title: attachment.title,
            url: attachment.url,
        }
    }
}