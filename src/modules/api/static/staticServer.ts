import staticServer from "koa-static";
import { logger } from "../../../public/logger";

export function getStaticServer() {
    const rootDir = process.env.STATIC_FOLDER;
    if (!rootDir) {
        throw logger.error("STATIC_FOLDER must be set in the environment variables.");
    }
    return staticServer(rootDir);
}
