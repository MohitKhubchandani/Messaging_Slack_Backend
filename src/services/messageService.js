import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js"
import messageRepository from "../repositories/messageRepository.js"
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workospaceService.js";

// Message service to get messages
export const getMessagesService = async (messageParams, page, limit, user) => {
    
    const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

    const workspace = channelDetails.workspace

    const isMember = isUserMemberOfWorkspace(workspace, user);

    if (!isMember) {
        throw new ClientError({
            explanation: 'User is not a member of the workspace',
            message: 'User is not a member of the workspace',
            statusCode: StatusCodes.UNAUTHORIZED   
        })
    }

    const messages = await messageRepository.getPaginatedMessages(
    messageParams, 
    page,
    limit
);

    return messages;
};

// Create a new message
export const createMessageService = async (message) => {
    const newMessage = await messageRepository.create(message);
    return newMessage;
}