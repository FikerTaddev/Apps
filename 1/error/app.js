

export class AppError extends Error {
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode
        this.name = this.constructor.name
    }
}
export class UserAlreadyExistsError extends AppError {
    constructor(message) {
        super("User already exist", 409)
    }
}


export class UserDoesnotExistError extends AppError {
    constructor(message) {
        super("User does not exist", 404)
    }

}

export class InvalidEmailFormatError extends AppError {
    constructor(message) {
        super("Invalid email format", 400)
    }
}
export class MissingFieldError extends AppError {
    constructor(message) {
        super("Missing email or password", 400)
    }
}
export class InvalidCredentialError extends AppError {
    constructor(message) {
        super("Invalid credentials", 400)
    }
}
