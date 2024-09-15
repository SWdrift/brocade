export interface AppError extends Error {
    status?: number;
    message: string;
}

/**
 * 创建应用错误对象
 * @param message 错误信息
 * @param status 错误状态码
 * @returns {AppError}
 * 
 * @example
 * const error = createAppError('服务器内部错误', 500);
 * throw error;
 */
export function createAppError(message: string, status?: number): AppError {
    const error = new Error(message) as AppError;
    error.status = status ?? 500;
    return error;
}
