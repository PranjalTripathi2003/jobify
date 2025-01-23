import { StatusCodes } from "http-status-codes";

// Error Middlewares will be moved to this file

// Handling non-routing errors, i.e, server, db etc.
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // because these are http-500 server errors
  const msg = err.message || "Something went wrong, try again later";
  res.status(statusCode).json({ msg: msg });
};

// Exporting the error handler middleware to handle errors in the application
export default errorHandlerMiddleware;