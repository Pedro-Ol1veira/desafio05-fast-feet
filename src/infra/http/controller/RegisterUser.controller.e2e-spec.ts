import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Register User', () => {

    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule ]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);

        await app.init()
    })

    test('[POST] /users', async () => {
        const response = await request(app.getHttpServer()).post('/users').send({ 
            cpf: '12312312323', 
            email: 'teste@gmail.com', 
            name: 'teste', 
            password: '123456', 
            role: 'CUSTOMER'
        });

        expect(response.statusCode).toBe(201);

        const userOnDatabase = await prisma.user.findUnique({ where: {email: 'teste@gmail.com' }});
        expect(userOnDatabase).toBeTruthy()
        expect(userOnDatabase?.role).toEqual('CUSTOMER')
    })
})
