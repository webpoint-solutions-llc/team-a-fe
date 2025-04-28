export class UnAuthorizedError extends Error {
  constructor(message = "You are not authorized to access this page") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(
    message = "You do not have enough permissions to access this page",
  ) {
    super(message);
    this.name = "ForbiddenError";
  }
}

/*
 * Throws a UnAuthorizedError with the given message.
 * @param message The message to include in the error.
 */
export function unauthorized(message?: string) {
  throw new UnAuthorizedError(message);
}

/*
 * Throws a UnAuthorizedError with the given message.
 * @param message The message to include in the error.
 */
export function forbidden(message?: string) {
  throw new ForbiddenError(message);
}

/*
 * Checks if the given error is a ForbiddenError.
 * @param error The error to check.
 * @returns True if the error is a ForbiddenError, false otherwise.
 */
export function isForbiddenError(error: unknown) {
  return error instanceof ForbiddenError;
}

/*
 * Checks if the given error is a UnAuthorizedError.
 * @param error The error to check.
 * @returns True if the error is a UnAuthorizedError, false otherwise.
 */
export function isUnAuthorizedError(error: unknown) {
  return error instanceof UnAuthorizedError;
}
