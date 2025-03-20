import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "server/utils/helpers";
import { ZodSchema } from "zod";

/**
 * Middleware to validate request query parameters using Zod
 * @param schema Zod schema for validation
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      jsonResponse(res, StatusCodes.BAD_REQUEST, '', { error: result.error.format() });
    }

    req.query = result.data; // Overwrite query params with validated values
    next();
  };
};

/**
 * Middleware to validate request parameters using Zod
 * @param schema Zod schema for validation
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      jsonResponse(res, StatusCodes.BAD_REQUEST, '', { error: result.error.format() });
    }

    req.params = result.data;
    next();
  };
};

/**
 * Middleware to validate request body using Zod
 * @param schema Zod schema for validation
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body.data);

    if (!result.success) {
      jsonResponse(res, StatusCodes.BAD_REQUEST, '', { error: result.error.format() });
    }

    req.body = result.data;
    next();
  };
};
