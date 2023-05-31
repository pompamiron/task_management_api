import { Request, Response } from "express";

import db from "../models";

const { Todo, Subtask } = db;

const SubtaskController = {
  createSubtask: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const todo = await Todo.findByPk(Number(id));
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" }) as unknown as Promise<void>;
      }

      const subtask = await Subtask.create({ title, TodoId: todo.id });
      res.status(201).json(subtask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateSubtask: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const subtask = await Subtask.findByPk(Number(id));

      if (status && !["pending", "completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" }) as unknown as Promise<void>;
      }

      const previousStatus = subtask.status;
      subtask.status = status;
      await subtask.save();

      if (status === "pending" && previousStatus !== "pending") {
        const parentTodo = await Todo.findByPk(subtask.TodoId);

        if (parentTodo && parentTodo.status === "completed") {
          parentTodo.status = "pending";
          await parentTodo.save();
        }
      }

      res.json(subtask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default SubtaskController;
