import { Module } from "@nestjs/common";
import { Uploader } from "@/domain/carrier/application/storage/Uploader";
import { R2Storage } from "./R2Storage";
import { EnvModule } from "../env/env.module";

@Module({
    imports: [EnvModule],
    providers: [
        {
            provide: Uploader,
            useClass: R2Storage,
        },
    ],
    exports: [
        Uploader,
    ]
})
export class StorageModule {}