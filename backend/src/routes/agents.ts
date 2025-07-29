import express from 'express';
import { addAgent, getAgents } from '../controllers/agentController';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.post('/', authMiddleware, addAgent);
router.get('/', authMiddleware, getAgents);
export default router;
