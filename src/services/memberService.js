import { StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository";
import workspaceRepository from "../repositories/workspaceRepository"
import ClientError from "../utils/errors/clientError";
import { isUserMemberOfWorkspace } from "./workospaceService"

export const IsMemberPartOfWorkspaceService = async(
    workspaceId,
    memberId
) => {
        const workspace = await workspaceRepository.getById(workspaceId)

        if (!workspace) {
            throw new ClientError({
                explanation : 'Workspace not found',
                message : 'Workspace not found',
                statuscode : StatusCodes.NOT_FOUND 
            })
        }

        const isUserMember = isUserMemberOfWorkspace(workspace, memberId);

        if (!isUserMember) {
            throw new ClientError({
                explanation : 'User is not a member of the workspace',
                message : 'User is not a member of workspace',
                statuscode : StatusCodes.UNAUTHORIZED 
            })
        }
        const user = userRepository.getById(memberId)
        return user;
}