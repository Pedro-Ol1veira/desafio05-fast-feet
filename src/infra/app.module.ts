import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/infra/env/env';
import { EnvService } from './env/env.service';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    HttpModule,
    EnvModule,
    AuthModule,
    EventsModule,
  ],
  providers: [EnvService]
})
export class AppModule {}
