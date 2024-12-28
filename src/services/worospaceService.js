import workspaceRepository from '../repositories/workspaceRepository.js';
import { v4 as uuidv4 } from 'uuid';

export const createWorkspaceService = async (workspaceData) => {
    const joinCode = uuidv4().substring(0, 6);
    workspaceData.joinCode = joinCode;

    const response = await workspaceRepository.create({
        ...workspaceData,
         joinCode
        });
    
}