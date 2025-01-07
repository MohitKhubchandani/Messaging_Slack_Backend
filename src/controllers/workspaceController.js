import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWrokspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspacesUserIsMemberOfService,
  getWrokspaceByJoinCodeService,
  getWrokspaceService,
  updateWrokspaceService
} from '../services/workospaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const createWorkspaceController = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'));
  } catch (error) {
    console.error('User controller error:', error); // Use proper logging in production

    // Check for the correct statusCode property (lowercase 's')
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getWorkspacesUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspaces fetched successfully'));
  } catch (error) {
    console.error('User controller error:', error); // Use proper logging in production

    // Check for the correct statusCode property (lowercase 's')
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'));
  } catch (error) {
    console.log('User controller error:', error); // Use proper logging in production
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspaceController = async (req, res) => {
  try {
    const response = await getWrokspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.error('User controller error:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspaceByJoinCodeController = async (req, res) => {
  try {
    const response = await getWrokspaceByJoinCodeService(req.params.joincode, req.user);
    
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.error('Get workspace by joinCode controller error:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const updatedWorkspaceController = async (req, res) => {
  try{   
    const response = await updateWrokspaceService(req.params.workspaceId, req.body, req.user);
    
    return res
    .status(StatusCodes.OK)
    .json(successResponse(response, 'Workspace Updated successfully'));

  }catch(error){
    console.log('Update Workspace controller error:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
 }

 export const addMemberToWorkspaceController = async (req, res) => {
  try{   
    const response = await addMemberToWorkspaceService(req.params.workspaceId, req.body.memberId,  req.body.role || 'member', req.user);

    
    return res
    .status(StatusCodes.OK)
    .json(successResponse(response, 'Member Added to Workspace successfully'));

  }catch(error){
    console.log('add members to Workspace controller error:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
 }

 export const addChannelToWorkspaceController = async (req, res) => {
  try{   

    const response = await addChannelToWrokspaceService(req.params.workspaceId, req.body.channelName, req.user);
    
    return res
    .status(StatusCodes.OK)
    .json(successResponse(response, 'Channel Added to Workspace successfully'));

  }catch(error){
    console.log('add channel to Workspace controller error:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
 };

