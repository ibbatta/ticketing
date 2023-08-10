import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public reason: string) {
    super(reason);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
