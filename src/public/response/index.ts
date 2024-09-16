export function createSuccessResponse(data?: Record<string, any>) {
    return {
        success: true,
        ...data
    };
}
