import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updatedWorkspaceController
} from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import {
  addChannelToWorkspaceSchema,
  addMemberToWorkspaceSchema,
  workspaceSchema
} from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  validate(workspaceSchema),
  createWorkspaceController
);
router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);
router.get('/:workspaceId', isAuthenticated, getWorkspaceController);
router.get(
  '/joinCode/:joincode',
  isAuthenticated,
  getWorkspaceByJoinCodeController
);
router.put('/:workspaceId', isAuthenticated, updatedWorkspaceController);
router.put(
  '/addmembers/:workspaceId',
  isAuthenticated,
  validate(addMemberToWorkspaceSchema),
  addMemberToWorkspaceController
);
router.put(
  '/addchannel/:workspaceId',
  isAuthenticated,
  validate(addChannelToWorkspaceSchema),
  addChannelToWorkspaceController
);
export default router;
