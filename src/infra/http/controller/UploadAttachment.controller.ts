import { BadRequestException, Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";
import { UploadAndCreateAttachmentUseCase } from "@/domain/carrier/application/useCases/Carrying/UploadAndCreateAttachmentUseCase";
import { FileInterceptor } from "@nestjs/platform-express";
import { InvalidAttachmentType } from "@/core/errors/errors/InvalidAttachmentType";


@Controller("/attachments")
@Roles(Role.Carrying)
@UseGuards(JwtAuthGuard, RoleGuard)
export class UploadAttachmentController {
    
    constructor(
        private uploadAndCreateAttachment : UploadAndCreateAttachmentUseCase,
    ) {}
    
    @Post()
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('file'))
    async handle(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
                    new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)'}) 
                ]
            })
        ) file: Express.Multer.File
    ) {
        const result = await this.uploadAndCreateAttachment.execute({
            fileName: file.originalname,
            fileType: file.mimetype,
            body: file.buffer
        });

        if(result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case InvalidAttachmentType:
                    throw new BadRequestException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

        const { attachment } = result.value;

        return { attachmentId: attachment.id.toString() }
    }
}