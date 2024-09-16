import serve from "koa-static-server";
import { logger } from "../../public/logger";

export function getStaticServe() {
    const rootDir = process.env.STATIC_FOLDER;
    if (!process.env.API_PREFIX || !process.env.STATIC_PATH) {
        throw logger.error(
            "STATIC_FOLDER, API_PREFIX, and STATIC_PATH must be set in the environment variables."
        );
    }
    const rootPath = process.env.API_PREFIX + process.env.STATIC_PATH;
    return serve({ rootDir, rootPath, last: true });
}
