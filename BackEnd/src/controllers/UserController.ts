import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();



// Get all users
export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by email
export const GetUserByEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.id.toLowerCase();
    const foundUser = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: foundUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user
export const UpdateUser = async (req: Request, res: Response)=> {
  try {
    const userEmail = req.params.id.toLowerCase();
    const { password, ...rest } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updateUser = await prisma.user.update({
      where: { email: userEmail },
      data: { ...rest, password: hashPassword, email: userEmail },
    });

    return res.status(200).send('User updated successfully!');
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user
export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.id.toLowerCase();

    const deleteUser = await prisma.user.delete({ where: { email: userEmail } });

    if (!deleteUser) {
      return res.status(404).send('User Not Exists');
    }

    return res.status(200).send('User deleted successfully');
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Register user
export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password, ...rest } = req.body;

    const foundUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (foundUser) {
      return res.status(400).send('User Already Exists, Please Login');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { ...rest, email: email.toLowerCase(), password: hashPassword },
    });

    return res.json({ message: 'User Registered Successfully', data: newUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login user
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const foundUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!foundUser) {
      return res.status(400).send('Invalid Email / Password');
    }

    const passTrue = await bcrypt.compare(password, foundUser.password);

    if (!passTrue) {
      return res.status(400).send('Invalid Email / Password');
    }

    return res.send('Logged-In Successfully');
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
