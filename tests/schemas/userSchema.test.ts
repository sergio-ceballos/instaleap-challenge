import { Request, Response, NextFunction } from "express";

import { loginSchema } from "../../src/models/schemas/userSchema";
import { validateSchema } from "../../src/middlewares/validateSchema";
import SchemaValidationError from "../../src/errors/schemaValidationError";

describe("validateSchema middleware with loginSchema", () => {
  const mockNext: NextFunction = jest.fn();
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call next() if validation succeeds", () => {
    const mockReq = {
      body: {
        username: "validUser",
        password: "validPassword123",
      },
    } as unknown as Request;

    const middleware = validateSchema({ body: loginSchema.body });
    middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should throw SchemaValidationError if validation fails (missing fields)", () => {
    const mockReq = {
      body: {
        username: "validUser",
      },
    } as unknown as Request;

    const middleware = validateSchema({ body: loginSchema.body });

    expect(() => middleware(mockReq, mockRes, mockNext)).toThrow(SchemaValidationError);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should throw SchemaValidationError if validation fails (invalid types)", () => {
    const mockReq = {
      body: {
        username: 123,
        password: "validPassword123",
      },
    } as unknown as Request;

    const middleware = validateSchema({ body: loginSchema.body });

    expect(() => middleware(mockReq, mockRes, mockNext)).toThrow(SchemaValidationError);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});

