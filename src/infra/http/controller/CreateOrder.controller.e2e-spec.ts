import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";
import { CustomerFactory } from "tests/factories/makeCustomer";

describe('Create Order', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;
    let customerFactory: CustomerFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [AdminFactory, CustomerFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);
        jwt = moduleRef.get(JwtService);
        customerFactory = moduleRef.get(CustomerFactory);
        await app.init()
    })

    test('[POST] /orders', async () => {

        const admin = await adminFactory.makePrismaAdmin();
        const token = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' });

        const customer = await customerFactory.makePrismaCustomer();

        
        const response = await request(app.getHttpServer()).post('/orders').set('Authorization', `Bearer ${token}`).send({ 
            address: "address-1",
            customerId: customer.id.toString()
        });

        
        expect(response.statusCode).toBe(201);

        const orderOnDatabase = await prisma.order.findFirst({ where: { customerId: customer.id.toString() }});
        expect(orderOnDatabase).toBeTruthy()
    })
})
