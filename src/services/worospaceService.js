import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channelRepository.js';
import workspaceRepository from '../repositories/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import validationError from '../utils/errors/validationError.js';

export const createWorkspaceService = async (workspaceData) => {
   
   try {

    const joinCode = uuidv4().substring(0, 6).toUpperCase(); // 6 digit join code
    workspaceData.joinCode = joinCode; // add join code to workspace data

    const response = await workspaceRepository.create({
    name : workspaceData.name,
    description: workspaceData.description,
    joinCode
    }); // create workspace

    await workspaceRepository.addMemberToWorkspace(
    response._id,
    workspaceData.owner,
    'admin'
    ); // add owner as admin to workspace

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(response._id, 'general'); // add general channel to workspace

    return updatedWorkspace; // return workspace data
    
   } catch (error) {
    if (error.name === 'validationError') {
        throw new validationError(
          {
            error: error.message
          },
          error.message
        );
      }
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new validationError(
          {
            error: ['A workspace with same details or username already exist']
          },
          'A workspace with same details or username already exist'
        );
      }
      throw error;
    }
   }
   
export const getWorkspacesUserIsMemberOfService = async (userId) => {
  try {
    const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId); // get workspaces user is member of
    return response; // return workspaces user is member of
  } catch (error) {
    console.log('get workspaces user is member of service error', error);
    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {  

  try {
    
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Workspace not found',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isAllowed = workspace.members.find((member) => member.memberId.toString() === userId && member.role === 'admin');
  
    // const channelIds = workspace.channels.map((channel) => channel._id);
  
    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels)
      const response = await workspaceRepository.delete(workspaceId);
    
      return response;
    };

    throw new ClientError({
      explanation: 'User is either not an admin or not a member of the workspace',
      message: 'User is not allowed to delete workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  


  } catch (error) {
    console.log('delete workspace service error', error);
    throw error;
  }
};

export const getWrokspaceService = async (workspaceId, userId) => {};
export const getWrokspaceByJoinCodeService = async (joinCode) => {};
export const updateWrokspaceService = async (workspaceId, workspaceData, userId) => {};
export const addMemberToWorkspaceService = async (workspaceId, memberId, role) => {};
export const addChannelToWrokspaceService = async (workspaceId, channelName) => {};