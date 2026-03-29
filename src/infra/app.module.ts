import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/infra/env/env';
import { EnvService } from './env/env.service';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    HttpModule,
    EnvModule
  ],
  providers: [EnvService]
})
export class AppModule {}
