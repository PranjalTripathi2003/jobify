/*
In **JavaScript**, properties (data members) of a class or object can be created dynamically by directly assigning values without prior declaration, unlike in **Java**, where fields must be explicitly declared at the class level. This flexibility in JavaScript is due to its dynamically typed nature, allowing properties to be added on the fly. 

### Example:
class ErrorExample {
  constructor(message) {
    this.name = "CustomError"; // Dynamically created and assigned
    this.message = message;   // No need for prior declaration
  }
}
In contrast, Java requires fields like `name` and `message` to be explicitly declared before assigning values.
*/


//THESE ERRORS ARE SETUP FOR 4XX CLIENT ERRORS
// 400 BAD_REQUEST Bad Request
// 401 UNAUTHORIZED Unauthorized
// 403 FORBIDDEN Forbidden
// 404 NOT_FOUND Not Found

import { StatusCodes } from "http-status-codes";
// Inheriting extending the in-built error class of js
export class NotFoundError extends Error {
  constructor(message) {
    super(message); // Error class of js will contain it's constructor with parameter of "message" and to call that in the child class we use super() function
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
