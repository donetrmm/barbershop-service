import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IBarbershopRepository } from '../../domain/repositories/barbershop.repository.interface';
import { CreateBarbershopDto, UpdateBarbershopDto, BarbershopResponseDto } from '../dtos/barbershop.dto';
import { Barbershop } from '../../domain/entities/barbershop.entity';

@Injectable()
export class BarbershopUseCase {
  constructor(
    @Inject('IBarbershopRepository')
    private readonly barbershopRepository: IBarbershopRepository,
  ) {}

  async getAllBarbershops(): Promise<BarbershopResponseDto[]> {
    const barbershops = await this.barbershopRepository.findAll();
    return barbershops;
  }

  async getBarbershopById(id: string): Promise<BarbershopResponseDto> {
    const barbershop = await this.barbershopRepository.findById(id);
    if (!barbershop) {
      throw new NotFoundException(`Barbería con ID ${id} no encontrada`);
    }
    return barbershop;
  }

  async createBarbershop(createBarbershopDto: CreateBarbershopDto, userId: string): Promise<BarbershopResponseDto> {
    const existingBarbershop = await this.barbershopRepository.findByName(createBarbershopDto.name);
    if (existingBarbershop) {
      throw new BadRequestException(`Ya existe una barbería con el nombre ${createBarbershopDto.name}`);
    }

    const newBarbershop = await this.barbershopRepository.create({
      ...createBarbershopDto,
      ownerId: userId,
    });

    return newBarbershop;
  }

  async updateBarbershop(id: string, updateBarbershopDto: UpdateBarbershopDto, userId: string): Promise<BarbershopResponseDto> {
    const barbershop = await this.barbershopRepository.findById(id);
    if (!barbershop) {
      throw new NotFoundException(`Barbería con ID ${id} no encontrada`);
    }

    if (barbershop.ownerId !== userId) {
      throw new BadRequestException('No tienes permiso para actualizar esta barbería');
    }

    if (updateBarbershopDto.name && updateBarbershopDto.name !== barbershop.name) {
      const existingBarbershop = await this.barbershopRepository.findByName(updateBarbershopDto.name);
      if (existingBarbershop && existingBarbershop.id !== id) {
        throw new BadRequestException(`Ya existe una barbería con el nombre ${updateBarbershopDto.name}`);
      }
    }

    const updatedBarbershop = await this.barbershopRepository.update(id, updateBarbershopDto);
    if (!updatedBarbershop) {
      throw new NotFoundException(`Barbería con ID ${id} no encontrada`);
    }
    return updatedBarbershop as BarbershopResponseDto;
  }

  async deleteBarbershop(id: string, userId: string): Promise<void> {
    const barbershop = await this.barbershopRepository.findById(id);
    if (!barbershop) {
      throw new NotFoundException(`Barbería con ID ${id} no encontrada`);
    }

    if (barbershop.ownerId !== userId) {
      throw new BadRequestException('No tienes permiso para eliminar esta barbería');
    }

    const result = await this.barbershopRepository.delete(id);
    if (!result) {
      throw new BadRequestException(`No se pudo eliminar la barbería con ID ${id}`);
    }
  }

  async getMyBarbershops(userId: string): Promise<BarbershopResponseDto[]> {
    const barbershops = await this.barbershopRepository.findByOwnerId(userId);
    return barbershops;
  }
}