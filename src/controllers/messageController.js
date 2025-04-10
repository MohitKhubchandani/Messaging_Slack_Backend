import { StatusCodes } from "http-status-codes";

import { getMessagesService } from "../services/messageService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";

// This controller function is responsible for fetching messages from a channel 
export const getMessages = async (req, res) => {
    try {

        const messages = await getMessagesService({
            channelId: req.params.channelId,
        }, 
        req.query.page || 1,
        req.query.limit || 20,
        req.user
      );
        
        return res
          .status(StatusCodes.OK)
          .json(successResponse(messages, 'Messages Fetched successfully'));
      } catch (error) {
        console.error('User controller error:', error); // Use proper logging in production
    
        // Check for the correct statusCode property (lowercase 's')
        if (error.statusCode) {
          return res.status(error.statusCode).json(customErrorResponse(error));
        }
    
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(internalErrorResponse(error));
      }
};