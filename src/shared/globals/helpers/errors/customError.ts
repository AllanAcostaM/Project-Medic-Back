import { IError } from './error.interface';

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      messaje: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}
