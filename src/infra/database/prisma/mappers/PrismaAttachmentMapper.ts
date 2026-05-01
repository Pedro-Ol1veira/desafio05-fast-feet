import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Attachment } from "@/domain/carrier/enterprise/entities/Attachment";
import { Attachment as PrismaAttachment, Prisma } from "prisma/generated/client";

export class PrismaAttachmentMapper {
    static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
        return {
            id: attachment.id.toString(),
            title: attachment.title,
            url: attachment.url,
        }
    }

    static toDomain(raw: PrismaAttachment): Attachment {
        return Attachment.create({
            title: raw.title,
            url: raw.url,
        }, new UniqueEntityId(raw.id));
    }
}