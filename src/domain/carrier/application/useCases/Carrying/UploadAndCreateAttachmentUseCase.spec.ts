import { InMemoryAttachmentRepository } from "@/../tests/repositories/InMemoryAttachmentRepository";
import { UploadAndCreateAttachmentUseCase } from "./UploadAndCreateAttachmentUseCase";
import { FakeUploader } from "tests/storage/fakeUploader";
import { InvalidAttachmentType } from "@/core/errors/errors/InvalidAttachmentType";


let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let fakeUploader: FakeUploader;
let sut: UploadAndCreateAttachmentUseCase;

describe("Upload and Create an Attachment", () => {

    beforeEach(() => {
        inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
        fakeUploader = new FakeUploader();
        sut = new UploadAndCreateAttachmentUseCase(inMemoryAttachmentRepository, fakeUploader);
    })

    it('should be able to upload and create an attachment', async () => {
        const result = await sut.execute({
            fileName: 'photo.png',
            fileType: "image/png",
            body: Buffer.from(""),
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            attachment: inMemoryAttachmentRepository.items[0],
        });
        expect(fakeUploader.uploads).toHaveLength(1);
        expect(fakeUploader.uploads[0]).toEqual(
            expect.objectContaining({
                fileName: "photo.png"
            })
        )
    });

    it("Should not be able to upload an attachment with invalid file type", async () => {
        const result = await sut.execute({
            fileName: "profile.mp3",
            fileType: "audio/mpeg",
            body: Buffer.from(""),
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidAttachmentType)
    });

});