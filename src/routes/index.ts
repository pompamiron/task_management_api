import express from "express";

import SubtaskController from "../controllers/SubtaskController";
import TodoController from "../controllers/TodoController";

const router = express.Router();

// Todo routes
router.get("/todos", TodoController.getAllTodos);
router.post("/todos", TodoController.createTodo);
router.patch("/todos/:id", TodoController.updateTodo);

// Subtask routes
router.post("/todos/:id/subtasks", SubtaskController.createSubtask);
router.patch("/subtasks/:id", SubtaskController.updateSubtask);

export default router;
