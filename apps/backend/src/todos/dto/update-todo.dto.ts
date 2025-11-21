import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import type { UpdateTodoDto as IUpdateTodoDto } from '@packages/types';

export class UpdateTodoDto
  extends PartialType(CreateTodoDto)
  implements IUpdateTodoDto {}
