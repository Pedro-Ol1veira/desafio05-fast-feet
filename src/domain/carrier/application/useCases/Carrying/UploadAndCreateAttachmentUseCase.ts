import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Attachment } from "@/domain/carrier/enterprise/entities/Attachment";
import { AttachmentRepository } from "../../repositories/AttachmentRepository";
import { InvalidAttachmentType } from "@/core/errors/errors/InvalidAttachmentType";
import { Uploader } from "../../storage/Uploader";

interface UploadAndCreateAttachmentUseCaseRequest {
    fileName: string;
    fileType: string;
    body: Buffer;
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
    InvalidAttachmentType,
    {
        attachment: Attachment;
    }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {

    constructor(
        private attachmentRepository: AttachmentRepository,
        private uploader: Uploader,
    ) {}

    async execute({ body, fileName, fileType }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
        if(!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) return left(new InvalidAttachmentType(fileType));
        
        const { url } = await this.uploader.upload({
            fileName,
            fileType,
            body
        });
        
        const attachment = Attachment.create({
            title: fileName,
            url
        });
        
        await this.attachmentRepository.create(attachment);

        return right({ attachment });
    }
}