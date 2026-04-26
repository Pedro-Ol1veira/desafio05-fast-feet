export interface UploaderParms {
    fileName: string;
    fileType: string;
    body: Buffer;
}

export abstract class Uploader {
    abstract upload(params: UploaderParms): Promise<{ url: string }>;
}