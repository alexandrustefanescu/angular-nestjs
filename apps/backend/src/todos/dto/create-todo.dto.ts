import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { CreateTodoDto as ICreateTodoDto } from '@packages/types';

export class CreateTodoDto implements ICreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread from the store',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether the todo is completed',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
