import { Encrypter } from "@/domain/carrier/application/cryptography/Encrypter";

export class FakeEncrypter implements Encrypter {
    async encrypt(payload: Record<string, unknown>): Promise<string> {
        return JSON.stringify(payload);
    }

}