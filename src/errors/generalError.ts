import CustomError from "./customError";
import { ErrorCode } from "./errorCode";

class GeneralError extends CustomError<ErrorCode> {}

export default GeneralError;