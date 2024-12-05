import CustomError from "./customError";
import { ErrorCode } from "./errorCode";

class EntityNotFoundError extends CustomError<ErrorCode> {}

export default EntityNotFoundError;