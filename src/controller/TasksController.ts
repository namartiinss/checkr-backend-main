import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";
import { User } from "../entity/User";

const taskRepository = AppDataSource.getRepository(Tasks);
const userRepository = AppDataSource.getRepository(User);

export const createTaskForUser = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.params; // ID do usuário
  const { description, status } = request.body;

  try {
    const [user] = await userRepository.findBy({ id: Number(userId) });

    if (![user]) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    const newTask = taskRepository.create({ description, status, user });

    await taskRepository.save(newTask);

    return response
      .status(201)
      .json({ message: "Tarefa criada com sucesso", task: newTask });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

export const editUserTask = async (request: Request, response: Response) => {
  const { userId, taskId } = request.params; // ID do usuário e ID da tarefa
  const { description, status } = request.body;

  try {
    const [user] = await userRepository.findBy({ id: Number(userId) });
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    const task = await taskRepository.findOne({
      where: { id: Number(taskId), user },
    });
    if (!task) {
      return response
        .status(404)
        .json({ error: "Tarefa não encontrada para este usuário" });
    }

    task.description = description || task.description;
    task.status = status || task.status;

    await taskRepository.save(task);

    return response
      .status(200)
      .json({ message: "Tarefa editada com sucesso", task });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao editar tarefa" });
  }
};

export const deleteUserTask = async (request: Request, response: Response) => {
  const { userId, taskId } = request.params; // ID do usuário e ID da tarefa

  try {
    const [user] = await userRepository.findBy({ id: Number(userId) });
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    const task = await taskRepository.findOne({
      where: { id: Number(taskId), user },
    });
    if (!task) {
      return response
        .status(404)
        .json({ error: "Tarefa não encontrada para este usuário" });
    }

    await taskRepository.remove(task);

    return response
      .status(200)
      .json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};

export const getUserTasks = async (request: Request, response: Response) => {
  const { userId } = request.params; // ID do usuário

  try {
    const user = await userRepository.findOne({ where: { id: Number(userId) }, relations: ['tasks'] });

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    return response.status(200).json({ tasks: user.tasks });
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao buscar tarefas do usuário' });
  }
};