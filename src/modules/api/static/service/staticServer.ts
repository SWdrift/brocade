import staticServer from "koa-static";
import { getEnv, EnvEnum } from "../../../../public/env";
import { CONFIG } from "../config";

export function getStaticServer() {
    const rootDir = getEnv(EnvEnum.STATIC_FOLDER);
    return staticServer(rootDir, {
        defer: false, // 找到文件后不执行之后的中间件
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
