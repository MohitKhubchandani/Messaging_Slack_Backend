import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channelRepository.js';
import userRepository from '../repositories/userRepository.js';
import workspaceRepository from '../repositories/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import validationError from '../utils/errors/validationError.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
  return workspace.members.find(
    (member) => member.memberId.toString() === userId && member.role === 'admin'
  );
};

export const isUserMemberOfWorkspace = (workspace, userId) => {
  return workspace.members.find((member) => {
    return member.memberId._id.toString() === userId;
  });
};

const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
  return workspace.channels.find((channel) => channel.name === channelName);
};

export const createWorkspaceService = async (workspaceData) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase(); // 6 digit join code
    workspaceData.joinCode = joinCode; // add join code to workspace data

    const response = await workspaceRepository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    }); // create workspace

    await workspaceRepository.addMemberToWorkspace(
      response._id,
      workspaceData.owner,
      'admin'
    ); // add owner as admin to workspace

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      response._id,
      'general'
    ); // add general channel to workspace

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
};

export const getWorkspacesUserIsMemberOfService = async (userId) => {
  try {
    const response =
      await workspaceRepository.fetchAllWorkspaceByMemberId(userId); // get workspaces user is member of
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
    const isAllowed = isUserAdminOfWorkspace(workspace, userId);
    // const channelIds = workspace.channels.map((channel) => channel._id);

    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels);
      const response = await workspaceRepository.delete(workspaceId);

      return response;
    }

    throw new ClientError({
      explanation:
        'User is either not an admin or not a member of the workspace',
      message: 'User is not allowed to delete workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  } catch (error) {
    console.log('delete workspace service error', error);
    throw error;
  }
};

export const getWrokspaceService = async (workspaceId, userId) => {
  const workspace = await workspaceRepository.getById(workspaceId);
  if (!workspace) {
    throw new ClientError({
      explanation: 'invalid data sent from the client',
      message: 'Workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }
  const isMember = isUserMemberOfWorkspace(workspace, userId);
  if (!isMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
  return workspace;
};

export const getWrokspaceByJoinCodeService = async (joincode, userId) => {
  const workspace = await workspaceRepository.getWorkSpaceByJoinCode(joincode);
  if (!workspace) {
    throw new ClientError({
      explanation: 'Workspace not found',
      message: 'Workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }

  const isMember = isUserMemberOfWorkspace(workspace, userId);
  if (!isMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
  return workspace;
};

export const updateWrokspaceService = async (
  workspaceId,
  workspaceData,
  userId
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Workspace not found',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const updatedWorkspace = await workspaceRepository.update(
      workspaceId,
      workspaceData
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('update workspace service error', error);
    throw error;
  }
};

export const addMemberToWorkspaceService = async (
  workspaceId,
  memberId,
  role,
  userId
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Workspace not found',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const isValidUser = await userRepository.getById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'User not found',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMember = isUserMemberOfWorkspace(workspace, memberId);

    if (isMember) {
      throw new ClientError({
        explanation: 'User is Already a member of the workspace',
        message: 'User is Already a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const response = await workspaceRepository.addMemberToWorkspace(
      workspaceId,
      memberId,
      role
    );

    return response;
  } catch (error) {
    console.log('add member to workspace service error', error);
    throw error;
  }
};

export const addChannelToWrokspaceService = async (
  workspaceId,
  channelName,
  userId
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Workspace not found',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const isChannelAlreadyExist = isChannelAlreadyPartOfWorkspace(
      workspace,
      channelName
    );

    if (isChannelAlreadyExist) {
      throw new ClientError({
        explanation: 'Channel already part of workspace',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    );

    return response;
  } catch (error) {
    console.log('add channel to workspace service error', error);
    throw error;
  }
};
