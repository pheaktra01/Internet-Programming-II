import { forwardRef, Module } from "@nestjs/common";
import { NotificationsModule } from "../notifications/notifications.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ORDERS_SERVICE',
                transport: Transport.TCP,
                options: {
                host: process.env.ORDERS_HOST ?? 'localhost',
                port: parseInt(process.env.ORDERS_PORT ?? '4001', 10),
                },
            },
        ]),
        forwardRef(() => NotificationsModule),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
