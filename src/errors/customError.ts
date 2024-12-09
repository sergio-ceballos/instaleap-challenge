import { ICustomError } from "../interfaces/IError";

class CustomError<C extends string> extends Error {
  message: string;
  status: number;
  code?: C;

  constructor({ message, status, code }: ICustomError<C>) {
    super();
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

export default CustomError;
