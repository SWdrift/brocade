import { createAppError } from "../error/modules/appError";
import { logger } from "../logger";
import { CONFIG } from "./config";

/**
 * 全局验证器
 */
export function verifyGlobalRequest(app: Application) {
    app.use(async (ctx: Context<any>, next: Next) => {
        const apiPrefix = process.env.API_PREFIX;
        if (!apiPrefix) {
            throw logger.error("API_PREFIX is not defined in environment variables.");
        }
        if (ctx.request.path.startsWith(apiPrefix)) {
            // 如果是api请求，则进行验证
            if (verifyApiRequest(ctx)) {
                await next();
            } else {
                throw createAppError("Invalid request", 400);
            }
        } else {
            // 如果是页面请求，则跳过验证
            await next();
        }
    });
}

function verifyApiRequest(ctx: Context<any>) {
    if (ctx.request.url.length > CONFIG.MAX_URL_LENGTH) {
        throw createAppError("Request URL is too long", 414);
    }
    return true;
}
