import { Request, Response } from 'express';
import { Agent } from '../models/Agent';
import { List } from '../models/List';
import { parseCSV, parseExcel, distributeItems } from '../utils/fileProcessing';
import mongoose from 'mongoose';

export const uploadAndDistribute = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'File missing' });

    const ext = req.file.originalname.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext!)) {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const agents = await Agent.find();
    if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

    let entries;
    if (ext === 'csv') {
      entries = parseCSV(req.file.buffer);
    } else {
      entries = parseExcel(req.file.buffer);
    }

    const distributed = distributeItems(entries, agents);

const listSaves = Object.entries(distributed).map(([agentId, items]) => {
  return new List({
    agentId: new mongoose.Types.ObjectId(agentId), // ✅ ensure ObjectId
    items, // ✅ this should be an array of { firstName, phone, notes }
  }).save()
})
    await Promise.all(listSaves);
    res.status(200).json({ message: 'List uploaded and distributed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAgentLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find().populate('agentId', 'name email');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lists' });
  }
};
