import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from '../repositories/workspaceRepository.js';
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

