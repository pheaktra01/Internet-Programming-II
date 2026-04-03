import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CoreModule } from "../core/core.module";
import { ReceiptsModule } from "src/receipts/receipts.module";
import { OrdersModule } from "src/orders/orders.module";

@Module({
    imports: [CoreModule],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}