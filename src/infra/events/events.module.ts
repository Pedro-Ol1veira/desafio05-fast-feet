import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SendNotificationUseCase } from "@/domain/notification/application/useCases/SendNotification";
import { OnOrderStatusChanged } from "@/domain/notification/application/subscribers/OnOrderStatusChanged";

@Module({
    imports: [DatabaseModule],
    providers: [
        OnOrderStatusChanged,
        SendNotificationUseCase,
    ]
})
export class EventsModule {}