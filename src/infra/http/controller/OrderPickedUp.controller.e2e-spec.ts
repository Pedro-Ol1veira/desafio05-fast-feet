import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";
import { CarryingFactory } from "tests/factories/makeCarrying";
import { CustomerFactory } from "tests/factories/makeCustomer";
import { OrderFactory } from "tests/factories/makeOrder";

describe('Order Picked Up', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;
    let customerFactory: CustomerFactory;
    let orderFactory: OrderFactory;
    let carryingFactory: CarryingFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [AdminFactory, CustomerFactory, OrderFactory, CarryingFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);
        jwt = moduleRef.get(JwtService);
        customerFactory = moduleRef.get(CustomerFactory);
        orderFactory = moduleRef.get(OrderFactory);
        carryingFactory = moduleRef.get(CarryingFactory);
        await app.init()
    })

    test('[PATCH] /orders/:orderId/pickup/:carryingId', async () => {

        const admin = await adminFactory.makePrismaAdmin();
        const token = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' });

        const customer = await customerFactory.makePrismaCustomer();
        const carrying = await carryingFactory.makePrismaCarrying();
        const order = await orderFactory.makePrismaOrder({
            customerId: customer.id,
            address: 'teste'
        });

        expect(order.status).toBe(undefined);
        
        const response = await request(app.getHttpServer())
            .patch(`/orders/${order.id.toString()}/pickup/${carrying.id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send();
        
        expect(response.statusCode).toBe(204);
        const orderOnDatabase = await prisma.order.findUnique({ where: { id: order.id.toString() }});

        expect(orderOnDatabase?.status).toEqual("RETIRADA");

    })
})
