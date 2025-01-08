import { Router } from 'express';

import { getChannelByIdController } from '../../controllers/channelController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
const router = Router();

router.get('/:channelid', isAuthenticated, getChannelByIdController);

export default router 