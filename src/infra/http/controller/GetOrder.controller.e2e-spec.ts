import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";
import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";
import { CustomerFactory } from "tests/factories/makeCustomer";
import { OrderFactory } from "tests/factories/makeOrder";

describe('Get Order', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;
    let customerFactory: CustomerFactory;
    let orderFactory: OrderFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [AdminFactory, CustomerFactory, OrderFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);
        jwt = moduleRef.get(JwtService);
        customerFactory = moduleRef.get(CustomerFactory);
        orderFactory = moduleRef.get(OrderFactory);
        await app.init()
    })

    test('[GET] /orders/:id', async () => {

        const admin = await adminFactory.makePrismaAdmin();
        const token = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' });

        const customer = await customerFactory.makePrismaCustomer();

        const order = await orderFactory.makePrismaOrder({
            customerId: customer.id,
            address: Address.create({
                complement: "ap-1",
                street: "Rua",
                latitude: -27.2092052,
                number: 2,
                longitude: -49.6401091,
            })
        });

        const response = await request(app.getHttpServer()).get(`/orders/${order.id.toString()}`).set('Authorization', `Bearer ${token}`).send();
        
        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            order: expect.objectContaining({
                complement: "ap-1"
            })
        });
    })
})
