import { forwardRef, Module } from "@nestjs/common";
import { NotificationsModule } from "../notifications/notifications.module";
import { ClientsModule } from "@nestjs/microservices";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        ClientsModule.register([

        ]),
        forwardRef(() => NotificationsModule),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
