import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

import { getProperty } from "../utils/objectUtils";
import CustomError from "../errors/customError";
import SchemaValidationError from "../errors/schemaValidationError";

export const validateSchema = (schemas: Partial<Record<keyof Request, Schema>>) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  return (req: Request, res: Response, next: NextFunction) => {
    Object.entries(schemas).every(([source, schema]) => {
      const { error } = schema.validate(getProperty(req, source as keyof Request), validationOptions);

      if (error) {
        throw new SchemaValidationError({
          message: error.details.map((e) => e.message).join(", "),
          status: 400,
          code: 'ERROR_VALIDATION'
        });
      }
    });

    return next();
  };
};
