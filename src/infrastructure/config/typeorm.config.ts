import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Barbershop } from '../../domain/entities/barbershop.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'barbershop_service',
  entities: [Barbershop],
  synchronize: process.env.NODE_ENV !== 'production',
};