import CustomError from "./customError";
import { ErrorCode } from "./errorCode";

class SchemaValidationError extends CustomError<ErrorCode> {}

export default SchemaValidationError;