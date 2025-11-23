import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);

    vi.clearAllMocks();
  });

  describe('POST /v1/todos', () => {
    it('should create a todo and return it', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
      };

      const mockCreate = vi
        .spyOn(service, 'create')
        .mockResolvedValue(mockTodo);

      const result: Todo = await controller.create(createTodoDto);

      expect(result.id).toBeDefined();
      expect(result.title).toBe('Test Todo');
      expect(result.isCompleted).toBe(false);

      mockCreate.mockRestore();
    });

    it('should create a todo with only title', async () => {
      const createTodoDto: CreateTodoDto = { title: 'Simple Todo' };
      const newTodo: Todo = {
        ...mockTodo,
        title: 'Simple Todo',
      };

      const mockCreate = vi.spyOn(service, 'create').mockResolvedValue(newTodo);

      const result: Todo = await controller.create(createTodoDto);

      expect(result.title).toBe('Simple Todo');

      mockCreate.mockRestore();
    });
  });

  describe('GET /v1/todos', () => {
    it('should return all todos', async () => {
      const todos: Todo[] = [
        mockTodo,
        { ...mockTodo, id: 2, title: 'Another Todo' },
      ];

      const mockFindAll = vi.spyOn(service, 'findAll').mockResolvedValue(todos);

      const result: Todo[] = await controller.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Test Todo');

      mockFindAll.mockRestore();
    });

    it('should return empty array when no todos exist', async () => {
      const mockFindAll = vi.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);

      mockFindAll.mockRestore();
    });
  });

  describe('GET /v1/todos/:id', () => {
    it('should return a todo by id', async () => {
      const mockFindOne = vi
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockTodo);

      const result: Todo = await controller.findOne('1');

      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Todo');

      mockFindOne.mockRestore();
    });

    it('should throw NotFoundException for non-existent todo', async () => {
      const error = new NotFoundException('Todo with ID 999 not found');
      const mockFindOne = vi.spyOn(service, 'findOne').mockRejectedValue(error);

      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );

      mockFindOne.mockRestore();
    });
  });

  describe('PATCH /v1/todos/:id', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Todo' };
      const updatedTodo: Todo = { ...mockTodo, title: 'Updated Todo' };

      const mockUpdate = vi
        .spyOn(service, 'update')
        .mockResolvedValue(updatedTodo);

      const result: Todo = await controller.update('1', updateTodoDto);

      expect(result.title).toBe('Updated Todo');

      mockUpdate.mockRestore();
    });

    it('should update only specified fields', async () => {
      const updateTodoDto: UpdateTodoDto = { isCompleted: true };
      const updatedTodo: Todo = { ...mockTodo, isCompleted: true };

      const mockUpdate = vi
        .spyOn(service, 'update')
        .mockResolvedValue(updatedTodo);

      const result: Todo = await controller.update('1', updateTodoDto);

      expect(result.isCompleted).toBe(true);
      expect(result.title).toBe(mockTodo.title);

      mockUpdate.mockRestore();
    });

    it('should throw NotFoundException for non-existent todo', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated' };
      const error = new NotFoundException('Todo with ID 999 not found');

      const mockUpdate = vi.spyOn(service, 'update').mockRejectedValue(error);

      await expect(controller.update('999', updateTodoDto)).rejects.toThrow(
        NotFoundException,
      );

      mockUpdate.mockRestore();
    });
  });

  describe('DELETE /v1/todos/:id', () => {
    it('should delete a todo', async () => {
      const mockRemove = vi
        .spyOn(service, 'remove')
        .mockResolvedValue(mockTodo);

      const result: Todo = await controller.remove('1');

      expect(result.id).toBe(1);

      mockRemove.mockRestore();
    });

    it('should throw NotFoundException for non-existent todo', async () => {
      const error = new NotFoundException('Todo with ID 999 not found');
      const mockRemove = vi.spyOn(service, 'remove').mockRejectedValue(error);

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);

      mockRemove.mockRestore();
    });
  });
});
