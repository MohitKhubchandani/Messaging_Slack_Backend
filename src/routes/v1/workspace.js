import express from 'express';

import { createWorkspaceController, getWorkspacesUserIsMemberOfController } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

router.post('/', isAuthenticated, validate(workspaceSchema), createWorkspaceController)
router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController)

export default router;
