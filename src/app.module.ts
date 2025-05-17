import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BarbershopModule } from './infrastructure/modules/barbershop.module';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BarbershopModule,
  ],
})
export class AppModule {}