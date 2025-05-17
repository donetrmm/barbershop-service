import { Barbershop } from '../entities/barbershop.entity';

export interface IBarbershopRepository {
  findAll(): Promise<Barbershop[]>;
  findById(id: string): Promise<Barbershop | null>;
  findByName(name: string): Promise<Barbershop | null>;
  create(barbershop: Partial<Barbershop>): Promise<Barbershop>;
  update(id: string, barbershop: Partial<Barbershop>): Promise<Barbershop | null>;
  delete(id: string): Promise<boolean>;
  findByOwnerId(ownerId: string): Promise<Barbershop[]>;
}