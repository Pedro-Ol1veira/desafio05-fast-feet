import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Attachment, AttachmentProps } from "@/domain/carrier/enterprise/entities/Attachment";
import { faker } from "@faker-js/faker/locale/pt_BR";


export function makeAttachment(overide: Partial<AttachmentProps> = {}, id?: UniqueEntityId) {
    const newAttachment = Attachment.create({
        title: faker.lorem.text(),
        url: faker.internet.url(),
        ...overide
    }, id);

    return newAttachment;
}