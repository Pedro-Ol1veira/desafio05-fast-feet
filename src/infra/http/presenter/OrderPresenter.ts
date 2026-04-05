import { Order } from "@/domain/carrier/enterprise/entities/Order";


export class OrderPresenter {
    static toHTTP(order: Order) {
        return {
            id: order.id.toString(),
            address: order.address,
            status: order.status,
            carryingId: order.carryingId,
        }
    }
}