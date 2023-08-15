import { IError } from './error.interface';

export interface IErrorResponse {
  messaje: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}
