import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const checkUserExists = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (!existingUser) {
      return response.status(404).json({ exists: false, message: 'Usuário não encontrado' });
    }

    if (existingUser.password !== password) {
      return response.status(401).json({ exists: true, validPassword: false, message: 'Senha inválida' });
    }

    return response.status(200).json({ exists: true, validPassword: true, user: existingUser });
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao verificar usuário' });
  }
};

// Controlador para criar um usuário
export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    // Verificar se o usuário já existe pelo email
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return response.status(400).json({ message: "Email do usuário já existe" });
    }

    const newUser = userRepository.create({ name, email, password });
    await userRepository.save(newUser);

    return response
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao criar usuário" });
  }
};
