import { Module } from '@nestjs/common';
import { AppController } from './http/controller/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
