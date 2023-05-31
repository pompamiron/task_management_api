import { Request, Response } from 'express';
import TodoController from '../TodoController';
import db from '../../models';

const { Todo, Subtask } = db;

describe('TodoController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllTodos', () => {
    it('should return all todos with their subtasks', async () => {
      const findAllMock = jest.spyOn(Todo, 'findAll').mockResolvedValue([]);

      await TodoController.getAllTodos(req, res);

      expect(findAllMock).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle errors and return status 500', async () => {
      const findAllMock = jest.spyOn(Todo, 'findAll').mockRejectedValue(new Error('Database error'));

      await TodoController.getAllTodos(req, res);

      expect(findAllMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo and return it', async () => {
      const createMock = jest.spyOn(Todo, 'create').mockResolvedValue({ id: 1, title: 'Test Todo' } as unknown as typeof Todo);

      req.body = { title: 'Test Todo' };

      await TodoController.createTodo(req, res);

      expect(createMock).toHaveBeenCalledWith({ title: 'Test Todo' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Test Todo' });
    });

    it('should handle missing title and return status 400', async () => {
      req.body = {};

      await TodoController.createTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Title is required' });
    });

    it('should handle errors and return status 500', async () => {
      const createMock = jest.spyOn(Todo, 'create').mockRejectedValue(new Error('Database error'));

      req.body = { title: 'Test Todo' };

      await TodoController.createTodo(req, res);

      expect(createMock).toHaveBeenCalledWith({ title: 'Test Todo' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('updateTodo', () => {
    it('should update a todo and its subtasks and return the updated todo', async () => {
      const todo = { id: 1, title: 'Test Todo', status: 'pending', save: jest.fn() } as unknown as typeof Todo;
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue(todo);

      req.params = { id: '1' };
      req.body = { status: 'completed' };

      await TodoController.updateTodo(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1, { include: Subtask });
      expect(todo.save).toHaveBeenCalled();
    });

    it('should handle missing todo and return status 404', async () => {
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue(null);

      req.params = { id: '1' };
      req.body = { status: 'completed' };

      await TodoController.updateTodo(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1, { include: Subtask });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });

    it('should handle invalid status and return status 400', async () => {
      const todo = { id: 1, title: 'Test Todo', status: 'pending' } as unknown as typeof Todo;
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue(todo);

      req.params = { id: '1' };
      req.body = { status: 'invalid' };

      await TodoController.updateTodo(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1, { include: Subtask });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid status' });
    });

    it('should handle errors and return status 500', async () => {
      const todo = { id: 1, title: 'Test Todo', status: 'pending', save: jest.fn() } as unknown as typeof Todo;
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockRejectedValue(new Error('Database error'));

      req.params = { id: '1' };
      req.body = { status: 'completed' };

      await TodoController.updateTodo(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1, { include: Subtask });
      expect(todo.save).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
