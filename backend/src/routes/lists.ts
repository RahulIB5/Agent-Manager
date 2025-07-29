import express from 'express';
import multer from 'multer';
import { uploadAndDistribute, getAgentLists } from '../controllers/listController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Use multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('file'), uploadAndDistribute);
router.get('/', authMiddleware, getAgentLists);

export default router;
