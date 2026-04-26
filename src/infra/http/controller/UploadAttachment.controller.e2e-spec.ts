import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { CarryingFactory } from "@/../tests/factories/makeCarrying";

describe("Upload attachment (E2E)", () => {
  let app: INestApplication;
  let jwt: JwtService;
  let carryingFactory: CarryingFactory;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CarryingFactory]
    }).compile();

    app = moduleRef.createNestApplication();

    carryingFactory = moduleRef.get(CarryingFactory);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test("[POST] /attachments", async () => {
    const user = await carryingFactory.makePrismaCarrying();

    const accessToken = jwt.sign({ sub: user.id.toString(), role: "CARRYING" });

    const response = await request(app.getHttpServer())
      .post(`/attachments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './tests/e2e/sample-upload.png');
    

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      attachmentId: expect.any(String)
    });
  });
});
