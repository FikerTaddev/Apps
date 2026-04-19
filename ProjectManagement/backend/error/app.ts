export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UserAlreadyExistsError extends AppError {
    constructor(message: string = "User already exists") {
        super(message, 409);
    }
}

export class UserDoesnotExistError extends AppError {
    constructor(message: string = "User does not exist") {
        super(message, 404);
    }
}

export class InvalidEmailFormatError extends AppError {
    constructor(message: string = "Invalid email format") {
        super(message, 400);
    }
}

export class MissingFieldError extends AppError {
    constructor(message: string = "Missing email or password") {
        super(message, 400);
    }
}

export class InvalidCredentialError extends AppError {
    constructor(message: string = "Invalid credentials") {
        super(message, 401);
    }
}