import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { compare, hash } from "bcryptjs";
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";

describe('Register User', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule],
            providers: [AdminFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);

        await app.init()
    })

    test('[POST] /sessions', async () => {

        const admin = await adminFactory.makePrismaAdmin({
            cpf: '12312312323',
            password: await hash('123456', 8),
        });
        
        const response = await request(app.getHttpServer()).post('/sessions').send({ 
            cpf: '12312312323', 
            password: '123456', 
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            accessToken: expect.any(String)
        });
    })
})
