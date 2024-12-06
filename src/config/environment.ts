import Joi from "joi";

import 'dotenv/config';
import GeneralError from "../errors/generalError";

const envSchema = Joi.object({
  PORT: Joi.string().default(3000),
  NODE_ENV: Joi.string().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  INIT_DATA: Joi.boolean().required().default(true),
  DISTANCE_MATRIX_URL: Joi.string().uri().required(),
  DISTANCE_MATRIX_API_KEY: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  PAGINATION_LIMIT: Joi.number().integer().min(1).required().default(10),
  APP_DEBUG: Joi.boolean().required().default(false)
});

const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (error) {
  throw new GeneralError({
    message: error.details.map((e) => e.message).join(", "),
    status: 400,
    code: "ERROR_ENVIRONMENT",
  });
}

export const {
  PORT,
  NODE_ENV,
  MONGO_USER,
  MONGO_PASSWORD,
  INIT_DATA,
  DISTANCE_MATRIX_URL,
  DISTANCE_MATRIX_API_KEY,
  SECRET_KEY,
  PAGINATION_LIMIT,
  APP_DEBUG
} = envVars