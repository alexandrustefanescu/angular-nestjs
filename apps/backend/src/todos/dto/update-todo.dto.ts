import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import type { UpdateTodoDto as IUpdateTodoDto } from '@packages/types';

export class UpdateTodoDto
  extends PartialType(CreateTodoDto)
  implements IUpdateTodoDto
{
  @ApiPropertyOptional({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsString()
  @IsOptional()
  title?: string;

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
