import { Uploader, UploaderParms } from "@/domain/carrier/application/storage/Uploader";
import { randomUUID } from "crypto";


interface Upload {
    fileName: string;
    url: string;
}

export class FakeUploader implements Uploader {

    public uploads: Upload[] = [];
    
    async upload({ fileName }: UploaderParms): Promise<{ url: string; }> {
        const url = randomUUID();
        this.uploads.push({
            fileName,
            url
        });

        return { url };
    }

}