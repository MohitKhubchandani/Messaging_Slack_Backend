import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from '../repositories/workspaceRepository.js';

export const createWorkspaceService = async (workspaceData) => {
    const joinCode = uuidv4().substring(0, 6); // 6 digit join code
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

    await workspaceRepository.addChannelToWorkspace(response._id, 'general'); // add general channel to workspace

    return response; // return workspace data
};