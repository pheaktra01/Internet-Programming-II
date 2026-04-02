import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
        private readonly notificationsService: NotificationsService, // DI
    ) {}

    createOrder(orderDto: any) {
        this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

        this.notificationsService.notify( 'order_created', {
            order: orderDto,
        });

        return { status: 'Order accepted', order: orderDto };
    }
}