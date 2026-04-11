import { DomainEvents } from "@/core/events/DomainEvents";
import { FindManyNearByParams, OrderRepository } from "@/domain/carrier/application/repositories/OrderRepository";
import { PaginationParams } from "@/domain/carrier/application/repositories/PaginationParams";
import { Order } from "@/domain/carrier/enterprise/entities/Order";
import { getDistanceBetweenCoordinates } from "tests/GetDistanceBetweenCoordinates";

export class InMemoryOrderRepository extends OrderRepository {
    
    public items: Order[] = [];
    
    async create(order: Order): Promise<void> {
        this.items.push(order);
    }
    
    async findById(id: string): Promise<Order | null> {
        const order = this.items.find(item => item.id.toString() === id);
        if(!order) return null;
        
        return order;
    }
    
    async save(order: Order): Promise<void> {
        const orderIndex = this.items.findIndex(item => item.id.equals(order.id));
        
        this.items[orderIndex] = order;
        
        DomainEvents.dispatchEventsForAggregate(order.id);
    }
    
    async delete(order: Order): Promise<void> {
        const orderIndex = this.items.findIndex(item => item.id === order.id);
        
        this.items.splice(orderIndex, 1);
    }
    
    async fetchCarryingOrders(carryingId: string, { page }: PaginationParams): Promise<Order[]> {
        const orders = this.items
            .filter(order => order.carryingId?.toString() === carryingId)
            .slice((page - 1) * 20, page * 20);

        return orders;
    }

    async findManyOrdersNearBy(params: FindManyNearByParams, carryingId: string): Promise<Order[]> {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates({
                latitude: params.latitude,
                longitude: params.longitude,
            }, {
                latitude: item.address.latitude,
                longitude: item.address.longitude,
            })

            return distance < 10 && item.carryingId?.toString() === carryingId;
        })
    }
}