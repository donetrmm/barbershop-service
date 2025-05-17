import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Barbershop } from '../../domain/entities/barbershop.entity';
import { BarbershopUseCase } from '../../application/use-cases/barbershop.use-case';
import { BarbershopRepository } from '../repositories/barbershop.repository';
import { BarbershopController } from '../controllers/barbershop.controller';
import { JwtStrategy } from '../config/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Barbershop]),
  ],
  controllers: [BarbershopController],
  providers: [
    BarbershopUseCase,
    {
      provide: 'IBarbershopRepository',
      useClass: BarbershopRepository,
    },
    JwtStrategy,
  ],
  exports: [BarbershopUseCase],
})
export class BarbershopModule {}