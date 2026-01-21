export const _400 = {
  UPLOADED_FILE_IS_TOO_LARGE: {
    code: 'UPLOADED_FILE_IS_TOO_LARGE',
    message: 'Uploaded file is too large',
  },
  EMAIL_EXISTS: {
    code: 'EMAIL_EXISTS',
    message: 'User with specified email already exists',
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Email or password provided incorrect',
  },
};

export const _401 = {
  ORIGIN_NOT_SUPPORTED: {
    code: 'ORIGIN_NOT_SUPPORTED',
    message: 'The origin is not allowed by cors',
  },
  BAD_REQUEST: {
    code: 'BAD REQUEST',
    message: 'Either email or password is wrong!',
  },
};

export const _403 = {
  ACCESS_DENIED: {
    code: 'ACCESS_DENIED',
    message: 'You are not authorized to perform this action',
  },
};

export const _404 = {
  FILE_NOT_FOUND: {
    code: 'FILE_NOT_FOUND',
    message: 'Requested file not found',
  },
  PORTFOLIO_NOT_FOUND: {
    code: 'PORTFOLIO_NOT_FOUND',
    message: `Portfolio not found`,
  },
};

export const _500 = {
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
};
