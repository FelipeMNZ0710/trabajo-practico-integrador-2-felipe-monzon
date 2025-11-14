import { PersonModel } from '../models/person.model.js';
import { TaskModel } from '../models/task.model.js';
import { UserModel } from '../models/user.model.js';

// Obtener todas las tareas del usuario logueado
export const getAllTasksByUserId = async (req, res) => {
  const userLoggedId = req.user.id;

  try {
    const tasks = await TaskModel.findAll({
      where: { user_id: userLoggedId },
      include: [
        {
          model: UserModel,
          as: 'author',
          attributes: { exclude: ['password', 'person_id'] },
          include: [
            {
              model: PersonModel,
              as: 'person',
            },
          ],
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear nueva tarea
export const createTask = async (req, res) => {
  const userLoggedId = req.user.id;
  const { title, description, is_completed } = req.body;

  try {
    const newTask = await TaskModel.create({
      title,
      description,
      is_completed,
      user_id: userLoggedId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar tarea existente
export const updateTask = async (req, res) => {
  const userLoggedId = req.user.id;
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    const task = await TaskModel.findOne({
      where: { id, user_id: userLoggedId },
    });

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    await task.update({ title, description, is_completed });
    res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  const userLoggedId = req.user.id;
  const { id } = req.params;

  try {
    const task = await TaskModel.findOne({
      where: { id, user_id: userLoggedId },
    });

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    await task.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener estadísticas de tareas del usuario
export const getStats = async (req, res) => {
  const userLoggedId = req.user.id;

  try {
    const total = await TaskModel.count({ where: { user_id: userLoggedId } });
    const completed = await TaskModel.count({
      where: { user_id: userLoggedId, is_completed: true },
    });
    const pending = total - completed;

    res.json({ total, completed, pending });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error trayendo estadísticas' });
  }
};
