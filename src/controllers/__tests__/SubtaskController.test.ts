import { Request, Response } from 'express';
import SubtaskController from '../SubtaskController';
import db from '../../models';

const { Todo, Subtask } = db;

describe('SubtaskController', () => {
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

  describe('createSubtask', () => {
    it('should create a new subtask for the given todo and return it', async () => {
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue({ id: 1 } as unknown as typeof Todo);
      const createMock = jest.spyOn(Subtask, 'create').mockResolvedValue({ id: 1, title: 'Test Subtask' } as unknown as typeof Subtask);

      req.params = { id: '1' };
      req.body = { title: 'Test Subtask' };

      await SubtaskController.createSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(createMock).toHaveBeenCalledWith({ title: 'Test Subtask', TodoId: 1 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Test Subtask' });
    });

    it('should handle missing todo and return status 404', async () => {
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue(null);

      req.params = { id: '1' };
      req.body = { title: 'Test Subtask' };

      await SubtaskController.createSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });

    it('should handle errors and return status 500', async () => {
      const findByPkMock = jest.spyOn(Todo, 'findByPk').mockRejectedValue(new Error('Database error'));

      req.params = { id: '1' };
      req.body = { title: 'Test Subtask' };

      await SubtaskController.createSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('updateSubtask', () => {
    it('should update a subtask and its parent todo if necessary and return the updated subtask', async () => {
      const subtask = { id: 1, status: 'pending', save: jest.fn() } as unknown as typeof Subtask;
      const findByPkMock = jest.spyOn(Subtask, 'findByPk').mockResolvedValue(subtask);
      const findByPkTodoMock = jest.spyOn(Todo, 'findByPk').mockResolvedValue({ id: 1, status: 'completed', save: jest.fn() } as unknown as typeof Todo);

      req.params = { id: '1' };
      req.body = { status: 'completed' };

      await SubtaskController.updateSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(subtask.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(subtask);
    });

    it('should handle invalid status and return status 400', async () => {
      const subtask = { id: 1, status: 'pending' } as unknown as typeof Subtask;
      const findByPkMock = jest.spyOn(Subtask, 'findByPk').mockResolvedValue(subtask);

      req.params = { id: '1' };
      req.body = { status: 'invalid' };

      await SubtaskController.updateSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid status' });
    });

    it('should handle errors and return status 500', async () => {
      const subtask = { id: 1, status: 'pending', save: jest.fn() } as unknown as typeof Subtask;
      const findByPkMock = jest.spyOn(Subtask, 'findByPk').mockRejectedValue(new Error('Database error'));

      req.params = { id: '1' };
      req.body = { status: 'completed' };

      await SubtaskController.updateSubtask(req, res);

      expect(findByPkMock).toHaveBeenCalledWith(1);
      expect(subtask.save).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
