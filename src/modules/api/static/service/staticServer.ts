import staticServer from "koa-static";
import { getEnv, EnvEnum } from "../../../../public/env";
import { veifyFolderPath, addRootToPath } from "./fileService";
import { CONFIG } from "../config";

export function getStaticServer() {
    const rootDir = addRootToPath(getEnv(EnvEnum.STATIC_FOLDER));
    veifyFolderPath(rootDir);
    return staticServer(rootDir, {
        defer: false, // 找到文件后不执行之后的中间件
        setHeaders: (res, path, _stats) => {
            const mimeType = getMimeType(path);
            const utf8MimeType = addUtf8Charset(mimeType);
            if (mimeType) {
                res.setHeader("Content-Type", utf8MimeType);
            }
        }
    });
}

function getMimeType(path: string) {
    const ext = `.${path.split(".").pop()}`;
    return CONFIG.CUSTOM_MIME_TYPES[ext];
}

function addUtf8Charset(mimeType?: string) {
    if (!mimeType) {
        return "charset=UTF-8";
    }
    return `${mimeType}; charset=UTF-8`;
}
