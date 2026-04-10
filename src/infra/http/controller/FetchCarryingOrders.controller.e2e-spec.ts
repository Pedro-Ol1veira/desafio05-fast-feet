import { Address } from "@/domain/carrier/enterprise/entities/ValueObjects/Address";
import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CarryingFactory } from "tests/factories/makeCarrying";
import { CustomerFactory } from "tests/factories/makeCustomer";
import { OrderFactory } from "tests/factories/makeOrder";

describe('Get Order', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let carryingFactory: CarryingFactory;
    let customerFactory: CustomerFactory;
    let orderFactory: OrderFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [CarryingFactory, CustomerFactory, OrderFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        carryingFactory = moduleRef.get(CarryingFactory);
        jwt = moduleRef.get(JwtService);
        customerFactory = moduleRef.get(CustomerFactory);
        orderFactory = moduleRef.get(OrderFactory);
        await app.init()
    })

    test('[GET] /orders/:id', async () => {

        const carrying = await carryingFactory.makePrismaCarrying();
        const token = jwt.sign({ sub: carrying.id.toString(), role: 'CARRYING' });

        const customer = await customerFactory.makePrismaCustomer();

        await orderFactory.makePrismaOrder({ customerId: customer.id, carryingId: carrying.id, address: Address.create({
            complement: "ap-1",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }) });
        await orderFactory.makePrismaOrder({ customerId: customer.id, carryingId: carrying.id, address: Address.create({
            complement: "ap-2",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }) });
        await orderFactory.makePrismaOrder({ customerId: customer.id, carryingId: carrying.id, address: Address.create({
            complement: "ap-3",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }) });
        await orderFactory.makePrismaOrder({ customerId: customer.id, address: Address.create({
            complement: "ap-4",
            number: 2,
            street: "Rua",
            latitude: -27.2092052,
            longitude: -49.6401091,
        }) });

        const response = await request(app.getHttpServer()).get(`/carrying/orders/1`).set('Authorization', `Bearer ${token}`).send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body.orders).toHaveLength(3);
        expect(response.body).toEqual({
            orders: expect.arrayContaining([
                expect.objectContaining({
                    complement: "ap-1"
                }),
                expect.objectContaining({
                    complement: "ap-2"
                }),
                expect.objectContaining({
                    complement: "ap-3"
                }),
            ])
        });
    })
})
