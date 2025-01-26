import channelRepository from "../repositories/channelRepository.js"
import messageRepository from "../repositories/messageRepository.js"

export const getMessagesService = async (messageParams, page, limit) => {
    
    const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

    const workspace = channelDetails.workspace

    const isMember = await isMe

    const messages = await messageRepository.getPaginatedMessages(
    messageParams, 
    page,
    limit
);

    return messages;
}