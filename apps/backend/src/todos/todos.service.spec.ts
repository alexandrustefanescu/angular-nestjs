import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
      };

      mockRepository.create.mockReturnValue(createTodoDto);
      mockRepository.save.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto);

      expect(result).toEqual(mockTodo);
      expect(mockRepository.create).toHaveBeenCalledWith(createTodoDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should handle minimal todo creation', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Simple Todo',
      };

      const createdTodo: Todo = {
        ...mockTodo,
        title: 'Simple Todo',
      };

      mockRepository.create.mockReturnValue(createTodoDto);
      mockRepository.save.mockResolvedValue(createdTodo);

      const result: Todo = await service.create(createTodoDto);

      expect(result.title).toBe('Simple Todo');
      expect(mockRepository.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('findAll', () => {
    it('should return all todos ordered by createdAt descending', async () => {
      const mockTodos: Todo[] = [
        mockTodo,
        {
          ...mockTodo,
          id: 2,
          title: 'Another Todo',
        },
      ];

      mockRepository.find.mockResolvedValue(mockTodos);

      const result = await service.findAll();

      expect(result).toEqual(mockTodos);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: {
          createdAt: 'DESC',
        },
      });
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no todos exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockTodo);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTodo);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Todo with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      const updatedTodo: Todo = {
        ...mockTodo,
        ...updateTodoDto,
        updatedAt: new Date(),
      };

      mockRepository.findOneBy.mockResolvedValue(mockTodo);
      mockRepository.save.mockResolvedValue(updatedTodo);

      const result = await service.update(1, updateTodoDto);

      expect(result).toEqual(updatedTodo);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should update partial fields of a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        isCompleted: true,
      };

      const updatedTodo: Todo = {
        ...mockTodo,
        isCompleted: true,
      };

      mockRepository.findOneBy.mockResolvedValue(mockTodo);
      mockRepository.save.mockResolvedValue(updatedTodo);

      const result: Todo = await service.update(1, updateTodoDto);

      expect(result.isCompleted).toBe(true);
      expect(result.title).toBe(mockTodo.title);
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated',
      };

      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(999, updateTodoDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update(999, updateTodoDto)).rejects.toThrow(
        'Todo with ID 999 not found',
      );
    });
  });

  describe('remove', () => {
    it('should delete a todo', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockTodo);
      mockRepository.remove.mockResolvedValue(mockTodo);

      const result = await service.remove(1);

      expect(result).toEqual(mockTodo);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      await expect(service.remove(999)).rejects.toThrow(
        'Todo with ID 999 not found',
      );
    });
  });
});
