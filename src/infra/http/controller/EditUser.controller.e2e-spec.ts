import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";
import { CarryingFactory } from "tests/factories/makeCarrying";

describe('Edit User', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;
    let carryingFactory: CarryingFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [AdminFactory, CarryingFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);
        jwt = moduleRef.get(JwtService);
        carryingFactory = moduleRef.get(CarryingFactory);
        await app.init()
    })

    test('[PUT] /users/:id', async () => {

        const admin = await adminFactory.makePrismaAdmin({});
        const token = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' });

        const carrying = await carryingFactory.makePrismaCarrying({});
        
        const response = await request(app.getHttpServer()).put(`/users/${carrying.id.toString()}`).set('Authorization', `Bearer ${token}`).send({ 
            name: 'teste', 
            email: 'teste@gmail.com', 
            password: '123456', 
            role: 'CARRYING'
        });

        expect(response.statusCode).toBe(204);

        const userOnDatabase = await prisma.user.findUnique({ where: {email: 'teste@gmail.com' }});
        expect(userOnDatabase).toBeTruthy()
        expect(userOnDatabase).toEqual(expect.objectContaining({
            name: 'teste',
            cpf: carrying.cpf
        }))
        expect(userOnDatabase?.role).toEqual('CARRYING')
    })
})
