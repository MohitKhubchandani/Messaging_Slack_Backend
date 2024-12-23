import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import validationError from '../utils/errors/validationError.js';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User service error', error);
    if (error.name === 'validationError') {
      throw new validationError(
        {
          error: error.message
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new validationError(
        {
          error: ['A user with same email or username already exist']
        },
        'A user with same email or username already exist'
      );
    }
    throw error;
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'invalid Data sent from the client',
        message: 'no registered user found with this email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    // Match incoming password with the hashed password
    const isMatch = await bcrypt.compareSync(data.password, user.password);

    if (!isMatch) {
      throw new ClientError({
        explanation: 'invalid Data sent from the client',
        message: 'invalid password, please try again',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('User service error', error);
    throw error;
  }
};
