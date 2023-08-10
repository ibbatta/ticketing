import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = "Error connecting to databse";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
