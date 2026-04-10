import { Order } from "@/domain/carrier/enterprise/entities/Order";


export class OrderPresenter {
    static toHTTP(order: Order) {
        return {
            id: order.id.toString(),
            complement: order.address.complement,
            street: order.address.street,
            number: order.address.number,
            latitude: order.address.latitude,
            longitude: order.address.longitude,
            status: order.status,
            carryingId: order.carryingId,
        }
    }
}