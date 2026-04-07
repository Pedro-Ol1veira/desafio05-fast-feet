import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { hash } from "bcryptjs";
import request from 'supertest';
import { CarryingFactory } from "tests/factories/makeCarrying";

describe('Authenticate Carrying', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let carryingFactory: CarryingFactory;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule],
            providers: [CarryingFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        carryingFactory = moduleRef.get(CarryingFactory);

        await app.init()
    })

    test('[POST] /sessions/carrying', async () => {

        const carrying = await carryingFactory.makePrismaCarrying({
            cpf: '12312312323',
            password: await hash('123456', 8),
        });
        
        const response = await request(app.getHttpServer()).post('/sessions/carrying').send({ 
            cpf: '12312312323', 
            password: '123456', 
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            accessToken: expect.any(String)
        });
    })
})
