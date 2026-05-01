import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AttachmentFactory } from "tests/factories/makeAttachment";
import { CarryingFactory } from "tests/factories/makeCarrying";
import { CustomerFactory } from "tests/factories/makeCustomer";
import { OrderFactory } from "tests/factories/makeOrder";

describe('Order Delivered', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let carryingFactory: CarryingFactory;
    let customerFactory: CustomerFactory;
    let attachmentFactory: AttachmentFactory;
    let orderFactory: OrderFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [CarryingFactory, CustomerFactory, OrderFactory, AttachmentFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        carryingFactory = moduleRef.get(CarryingFactory);
        jwt = moduleRef.get(JwtService);
        customerFactory = moduleRef.get(CustomerFactory);
        orderFactory = moduleRef.get(OrderFactory);
        attachmentFactory = moduleRef.get(AttachmentFactory);
        await app.init()
    })

    test('[PATCH] /orders/:id/delivered', async () => {

        const carrying = await carryingFactory.makePrismaCarrying();
        const token = jwt.sign({ sub: carrying.id.toString(), role: 'CARRYING' });

        const customer = await customerFactory.makePrismaCustomer();
        const attachment = await attachmentFactory.makePrismaAttachment();

        const order = await orderFactory.makePrismaOrder({
            customerId: customer.id
        });

        expect(order.status).toBe(undefined);
        
        const response = await request(app.getHttpServer())
            .patch(`/orders/${order.id.toString()}/delivered`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                attachmentId: attachment.id.toString()
            });

        expect(response.statusCode).toBe(204);
        const orderOnDatabase = await prisma.order.findUnique({ where: { id: order.id.toString() }});

        expect(orderOnDatabase?.status).toEqual("ENTREGUE");

    })
})
