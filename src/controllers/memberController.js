import { StatusCodes } from "http-status-codes";

import { IsMemberPartOfWorkspaceService } from "../services/memberService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";
// is member part of workspace controller
export const isMemberPartOfWorkspaceController = async(req, res) => {
    try {
        const response = await IsMemberPartOfWorkspaceService(
            req.params.workspaceId, 
            req.user
        );
        
        return res
        .status(StatusCodes.OK)
        .json(successResponse(response, 'User is a member of the workspace'))
    } catch (error) {
         console.error('User controller error:', error);
        
            if (error.statusCode) {
              return res.status(error.statusCode).json(customErrorResponse(error));
            }
        
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json(internalErrorResponse(error));
    }
}