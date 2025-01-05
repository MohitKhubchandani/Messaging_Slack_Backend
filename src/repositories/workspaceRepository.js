import { StatusCodes } from 'http-status-codes';

import User from '../schema/user.js';
import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudRepository.js';

const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceDetailsById: async function (workspaceId) {
    const workspace = await Workspace.findById(workspaceId).populate('members.memberId', 'username email avatar').populate('channels'); // find workspace by id

    return workspace; // return workspace
  },

  // get workspace by name
  getWorkSpaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    }); // find workspace by name

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    } // if workspace not found, throw error

    return workspace; // return workspace
  },

  // get workspace by join code
  getWorkSpaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({joinCode}); // find workspace by join code

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    } // if workspace not found, throw error

    return workspace; // return workspace
  },

  // add member to workspace
  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId); // find workspace by id

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    } // if workspace not found, throw error

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    } // if user not found, throw error

    // check if user is already part of workspace
    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId
    ); // check if user is already part of workspace
 
    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User is already part of the workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    } // if user is already part of workspace, throw error

    workspace.members.push({
      memberId,
      role
    }); // add member to workspace

    workspace.save(); // save workspace

    return workspace; // return workspace
  },
  
  // add channel to workspace
  addChannelToWorkspace: async function (workspaceId, channelName) {
      const workspace = await Workspace.findById(workspaceId).populate('channels'); // find workspace by id

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    } // if workspace not found, throw error

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name == channelName
    ); // check if channel is already part of workspace

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel is already part of the workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    } // if channel is already part of workspace, throw error

    const newChannel = await channelRepository.create({name: channelName}); // create channel

    workspace.channels.push(newChannel); // add channel to workspace

    workspace.save(); // save workspace

    return workspace; // return workspace
  },

  // fetch all workspaces by member id
  fetchAllWorkspaceByMemberId: async function (memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId  
    }).populate('members.memberId', 'username email avatar'); // find workspaces by member id

    return workspaces; // return workspaces
  }
};

export default workspaceRepository;
