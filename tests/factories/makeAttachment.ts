import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Attachment, AttachmentProps } from "@/domain/carrier/enterprise/entities/Attachment";
import { PrismaAttachmentMapper } from "@/infra/database/prisma/mappers/PrismaAttachmentMapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { Injectable } from "@nestjs/common";


export function makeAttachment(overide: Partial<AttachmentProps> = {}, id?: UniqueEntityId) {
    const newAttachment = Attachment.create({
        title: faker.lorem.text(),
        url: faker.internet.url(),
        ...overide
    }, id);

    return newAttachment;
}

@Injectable()
export class AttachmentFactory {
    constructor(private prisma: PrismaService) {}

    async makePrismaAttachment(data: Partial<AttachmentProps> = {}): Promise<Attachment> {
        const attachment = makeAttachment(data);

        await this.prisma.attachment.create({
            data: {
                ...PrismaAttachmentMapper.toPrisma(attachment),
            }
        });

        return attachment;
    }
}