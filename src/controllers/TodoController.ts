import { Request, Response } from "express";

import db from "../models";

const { Todo, Subtask } = db;

const TodoController = {
  getAllTodos: async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await Todo.findAll({
        attributes: ["id", "title", "status", "createdAt"],
        include: {
          model: Subtask,
          attributes: ["id", "title", "status", "createdAt"],
        },
        order: [
          ["id", "ASC"],
          [Subtask, "id", "ASC"],
        ],
      });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createTodo: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" }) as unknown as Promise<void>;
      }

      const todo = await Todo.create({ title });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTodo: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const todo = await Todo.findByPk(Number(id), { include: Subtask });

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" }) as unknown as Promise<void>;
      }

      if (status && !["pending", "completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" }) as unknown as Promise<void>;
      }

      todo.status = status;
      await todo.save();

      const subtasks = todo.Subtasks;
      for (const subtask of subtasks) {
        subtask.status = status;
        await subtask.save();
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default TodoController;
