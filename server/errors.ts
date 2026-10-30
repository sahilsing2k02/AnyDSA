export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends HttpError {
  currentData?: any;
  constructor(message = 'Conflict detected: record was modified concurrently', currentData?: any) {
    super(message, 409);
    this.name = 'ConflictError';
    this.currentData = currentData;
  }
}

