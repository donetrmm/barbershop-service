import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BarbershopUseCase } from '../../application/use-cases/barbershop.use-case';
import { CreateBarbershopDto, UpdateBarbershopDto, BarbershopResponseDto } from '../../application/dtos/barbershop.dto';

@ApiTags('Barberías')
@Controller('barbershops')
export class BarbershopController {
  constructor(private readonly barbershopUseCase: BarbershopUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las barberías' })
  @ApiResponse({ status: 200, description: 'Lista de barberías', type: [BarbershopResponseDto] })
  async getAllBarbershops(): Promise<BarbershopResponseDto[]> {
    return this.barbershopUseCase.getAllBarbershops();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una barbería por ID' })
  @ApiResponse({ status: 200, description: 'Barbería encontrada', type: BarbershopResponseDto })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async getBarbershopById(@Param('id') id: string): Promise<BarbershopResponseDto> {
    return this.barbershopUseCase.getBarbershopById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva barbería' })
  @ApiResponse({ status: 201, description: 'Barbería creada exitosamente', type: BarbershopResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createBarbershop(
    @Body() createBarbershopDto: CreateBarbershopDto,
    @Request() req,
  ): Promise<BarbershopResponseDto> {
    return this.barbershopUseCase.createBarbershop(createBarbershopDto, req.user.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una barbería' })
  @ApiResponse({ status: 200, description: 'Barbería actualizada exitosamente', type: BarbershopResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o sin permisos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async updateBarbershop(
    @Param('id') id: string,
    @Body() updateBarbershopDto: UpdateBarbershopDto,
    @Request() req,
  ): Promise<BarbershopResponseDto> {
    return this.barbershopUseCase.updateBarbershop(id, updateBarbershopDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una barbería' })
  @ApiResponse({ status: 200, description: 'Barbería eliminada exitosamente' })
  @ApiResponse({ status: 400, description: 'Sin permisos para eliminar' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async deleteBarbershop(
    @Param('id') id: string,
    @Request() req,
  ): Promise<void> {
    return this.barbershopUseCase.deleteBarbershop(id, req.user.userId);
  }

  @Get('my/barbershops')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener mis barberías' })
  @ApiResponse({ status: 200, description: 'Lista de barberías del usuario', type: [BarbershopResponseDto] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getMyBarbershops(@Request() req): Promise<BarbershopResponseDto[]> {
    return this.barbershopUseCase.getMyBarbershops(req.user.userId);
  }
}