import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Todo } from '../interfaces/Todo';

const prisma = new PrismaClient();

export const GetAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving todos' });
  }
};

export const GetTodoByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving todo' });
  }
};

export const AddTodo = async (req: Request, res: Response) => {
  const { name, description, dateTime,complete ,userId}:Todo = req.body;
  try {
         await prisma.todo.create({
      data: { name, description,dateTime,complete,userId},
    });
    const newTasks = await prisma.todo.findMany({
      orderBy: {
        dateTime: 'asc',
      },
    });
    res.status(201).json(newTasks);
  } catch (error) {
    res.status(500).json({ error: 'Error adding todo' });
  }
};

export const UpdateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, dateTime,complete }:Todo = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data:  { name, description, dateTime,complete},
    });

    const newTasks = await prisma.todo.findMany({
      orderBy: {
        dateTime: 'asc',
      },
    });
    
    res.json(newTasks);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
};

export const DeleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    const newTasks = await prisma.todo.findMany({
      orderBy: {
        dateTime: 'asc',
      },
    });
    res.json(newTasks);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
};

// Gracefully disconnect Prisma client on process termination
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
