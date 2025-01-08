import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workospaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
    
    if (!channel || !channel.workspace) {
      throw new ClientError({
        message: 'Channel not found with the provided ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfWorkspace(
      channel.workspace,
      userId
    );
    console.log(isUserPartOfWorkspace);
    

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User is not a member of the workspace and hence cannot access the channel',
        explanation: 'User is not a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    return channel;
  } catch (error) {
    console.log('Get channel by ID service error',error);
    throw error;
  }
};
