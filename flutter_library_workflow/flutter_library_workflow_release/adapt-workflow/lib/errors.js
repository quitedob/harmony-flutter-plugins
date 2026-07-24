'use strict';

/**
 * Standardized error handling for Express routes.
 *
 * - AppError: throw in route handlers to send a structured error response.
 * - errorHandler: Express error middleware that normalizes all error shapes
 *   into { error: string } with appropriate HTTP status codes.
 * - asyncHandler: wraps async route handlers to forward rejections.
 */

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

function notFound(message = '资源不存在') {
  return new AppError(message, 404);
}

function badRequest(message = '请求参数无效') {
  return new AppError(message, 400);
}

function conflict(message = '操作冲突') {
  return new AppError(message, 409);
}

/**
 * Express error-handling middleware (4-argument signature).
 * Must be registered AFTER all routes.
 */
function errorHandler(err, _req, res, _next) {
  if (res.headersSent) return;

  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  if (statusCode >= 500) {
    console.error('[error]', err.message, err.stack ? err.stack.split('\n')[1] : '');
  }

  res.status(statusCode).json({ error: message });
}

/**
 * Wrap an async route handler so thrown / rejected errors reach errorHandler.
 */
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { AppError, notFound, badRequest, conflict, errorHandler, asyncHandler };
