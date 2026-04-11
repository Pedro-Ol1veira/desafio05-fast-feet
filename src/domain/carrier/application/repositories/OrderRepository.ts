import { Order } from "../../enterprise/entities/Order";
import { PaginationParams } from "./PaginationParams";

export interface FindManyNearByParams {
    latitude: number;
    longitude: number;
}

export abstract class OrderRepository {
    abstract create(order: Order): Promise<void>;
    abstract findById(id: string): Promise<Order | null>;
    abstract save(order: Order): Promise<void>;
    abstract delete(order: Order): Promise<void>;
    abstract fetchCarryingOrders(carryingId: string, params: PaginationParams): Promise<Order[]>;
    abstract findManyOrdersNearBy(params: FindManyNearByParams, carryingId: string): Promise<Order[]>;
}