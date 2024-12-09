import { Request, Response, NextFunction } from "express";
import SchemaValidationError from "../../src/errors/schemaValidationError";
import { validateSchema } from "../../src/middlewares/validateSchema";
import { orderSchema } from "../../src/models/schemas/orderSchema";

describe("validateSchema middleware", () => {
  const mockNext: NextFunction = jest.fn();
  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call next() if validation succeeds", () => {
    const mockReq = { params: { orderId: "67510e6081491f1c68934872" } } as unknown as Request;

    const middleware = validateSchema(orderSchema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should return 400 if validation fails", async () => {
    const mockReq = { params: { orderId: "invalid" } } as unknown as Request;

    const middleware = validateSchema(orderSchema);

    expect(() => middleware(mockReq , mockRes, mockNext)).toThrow(SchemaValidationError);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});
