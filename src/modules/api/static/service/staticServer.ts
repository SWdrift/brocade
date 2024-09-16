import staticServer from "koa-static";
import { logger } from "../../../../public/logger";
import { CONFIG } from "../config";

export function getStaticServer() {
    const rootDir = process.env.STATIC_FOLDER;
    if (!rootDir) {
        throw logger.error("STATIC_FOLDER must be set in the environment variables.");
    }
    return staticServer(rootDir, {
        defer: false,  // 找到文件后不执行之后的中间件
        setHeaders: (res, path, _stats) => {
            const mimeType = getMimeType(path);
            if (mimeType) {
                res.setHeader("Content-Type", mimeType);
            }
        }
    });
}

function getMimeType(path: string) {
    const ext = `.${path.split(".").pop()}`;
    return CONFIG.CUSTOM_MIME_TYPES[ext] || null;
}
