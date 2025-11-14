import { Router } from "express";
import {
  createTask,
  getAllTasksByUserId,
  updateTask,
  deleteTask,
  getStats, // <-- agregá esto
} from "../controllers/task.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTaskValidations,
  updateTaskValidations,
  deleteTaskValidations,
} from "../middlewares/validations/task.validations.js";
import { validator } from "../middlewares/validator.middleware.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks-by-user", authMiddleware, getAllTasksByUserId);
taskRoutes.post("/tasks", authMiddleware, createTaskValidations, validator, createTask);
taskRoutes.put("/tasks/:id", authMiddleware, updateTaskValidations, validator, updateTask);
taskRoutes.delete("/tasks/:id", authMiddleware, deleteTaskValidations, validator, deleteTask);

// Ruta nueva para estadísticas
taskRoutes.get("/tasks/stats", authMiddleware, getStats);
