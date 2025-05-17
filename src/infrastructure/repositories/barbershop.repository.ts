import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barbershop } from '../../domain/entities/barbershop.entity';
import { IBarbershopRepository } from '../../domain/repositories/barbershop.repository.interface';

@Injectable()
export class BarbershopRepository implements IBarbershopRepository {
  constructor(
    @InjectRepository(Barbershop)
    private readonly barbershopRepository: Repository<Barbershop>,
  ) {}

  async findAll(): Promise<Barbershop[]> {
    return this.barbershopRepository.find();
  }

  async findById(id: string): Promise<Barbershop | null> {
    return this.barbershopRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Barbershop | null> {
    return this.barbershopRepository.findOne({ where: { name } });
  }

  async create(barbershopData: Partial<Barbershop>): Promise<Barbershop> {
    const barbershop = this.barbershopRepository.create(barbershopData);
    return this.barbershopRepository.save(barbershop);
  }

  async update(id: string, barbershopData: Partial<Barbershop>): Promise<Barbershop | null> {
    await this.barbershopRepository.update(id, barbershopData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.barbershopRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async findByOwnerId(ownerId: string): Promise<Barbershop[]> {
    return this.barbershopRepository.find({ where: { ownerId } });
  }
}