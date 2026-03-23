import { MockInstance } from "vitest";
import { makeOrder } from "../../../../../tests/factories/makeOrder";
import { InMemoryNotificationRepository } from "../../../../../tests/repositories/InMemoryNotificationRepository";
import { InMemoryOrderRepository } from "../../../../../tests/repositories/InMemoryOrderRepository";
import { SendNotificationUseCase } from "../useCases/SendNotification";
import { OnOrderStatusChanged } from "./OnOrderStatusChanged"
import { waitFor } from "tests/utils/waitFor";

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;
let sendNotificationExecuteSpy: MockInstance;

describe('On Order Status Changed', () => {

    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository();
        inMemoryNotificationRepository = new InMemoryNotificationRepository();
        sut = new SendNotificationUseCase(inMemoryNotificationRepository);

        sendNotificationExecuteSpy = vi.spyOn(sut, 'execute');
        
        new OnOrderStatusChanged(sut);
    })
    
    it('should send a notification when a order status was changed', async () => {

        const order = makeOrder();
        inMemoryOrderRepository.items.push(order);
        order.status = "aguardando";

        inMemoryOrderRepository.save(order);

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled();
            expect(inMemoryNotificationRepository.items[0]).toEqual(expect.objectContaining({
                title: 'Encomenda aguardando'
            }))
        })
    })
    
})
