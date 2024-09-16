import { logger } from "../logger";
import { AppError } from "./modules/appError";

export function handleError(app: Application) {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            const err = e as AppError;
            ctx.status = err.status || 500;
            ctx.body = {
                message: err.message
            };
            logger.error(err.message);
        }
    });
}
