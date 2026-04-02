import { Inject, Injectable } from "@nestjs/common";
import { EVENT_PUBLISHER } from "../core/tokens";

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationsService {
    constructor(
        @Inject(EVENT_PUBLISHER)
        private readonly publisher: EventPublisher,
    ) {} // create circular dependency for demo

    notify(event: string, payload: any) {
        // for lab: log and publish through the shared event publisher
        console.log(`[NOTIFY] ${event}`, payload);
        this.publisher.publish(event, payload);

        // Example: call OrdersService for extry info (fake)
        // this.ordersService.deleteOldOrders(); // don't actually do it, just for illustration

        return { ok: true };
    }
}