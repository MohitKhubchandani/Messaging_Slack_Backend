import { StatusCodes } from 'http-status-codes';

import { signUpService } from '../services/userService.js';
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObjects.js';


export const signUp = async (req, res) => {
    try {
        const user = await signUpService(req.body);
        return res
            .status(StatusCodes.CREATED)
            .json(successResponse(user, 'User created successfully'));
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
