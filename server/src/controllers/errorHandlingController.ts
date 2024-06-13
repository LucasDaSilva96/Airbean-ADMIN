import { NextFunction, Request, Response } from 'express';
// Error handling middleware
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  res.status(400).json({
    status: 'fail', // Indicate failure status
    message: err.message, // Send error message in response
  });
};
