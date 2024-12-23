export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'internal server error'
  };
};

// Custom error response
export const customErrorResponse = (error) => {
  // If no message and explanation exist, return a generic internal error response
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }

  return {
    success: false,
    message: error.message || 'An error occurred', // Default message if error.message is not set
    err: error.explanation || {}, // Default to empty object if explanation is not present
    data: {}
  };
};

// Success response
export const successResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
    err: null // Setting 'err' to null to indicate no errors
  };
};
