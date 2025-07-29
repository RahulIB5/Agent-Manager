import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import agentRoutes from './routes/agents';
import listRoutes from './routes/lists';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Agent Manager Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);


connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
