import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from "tests/factories/makeAdmin";

describe('Register User', () => {

    let app: INestApplication;
    let prisma: PrismaService;
    let adminFactory: AdminFactory;
    let jwt: JwtService;
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule, DatabaseModule ],
            providers: [AdminFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prisma = moduleRef.get(PrismaService);
        adminFactory = moduleRef.get(AdminFactory);
        jwt = moduleRef.get(JwtService);
        await app.init()
    })

    test('[POST] /users', async () => {

        const admin = await adminFactory.makePrismaAdmin({
            cpf:'88877766655'
        });
        const token = jwt.sign({ sub: admin.id.toString() });

        const response = await request(app.getHttpServer()).post('/users').set('Authorization', `Bearer ${token}`).send({ 
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
