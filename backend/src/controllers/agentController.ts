import { Request, Response } from 'express';
import { Agent } from '../models/Agent';
import bcrypt from 'bcryptjs';

export const addAgent = async (req: Request, res: Response) => {
  const { name, email, mobile, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating agent' });
  }
};

export const getAgents = async (_req: Request, res: Response) => {
  const agents = await Agent.find();
  res.status(200).json(agents);
};
