import bodyParser from "koa-body";
import fs from "fs";
import { getEnv, EnvEnum } from "../../public/env";

export function useBodyParser(app: Application) {
    const uploadDir = getEnv(EnvEnum.UPLOAD_FOLDER);
    // 检查文件夹是否存在，不存在则创建
    checkUploadDir(uploadDir);
    app.use(
        bodyParser({
            multipart: true,
            formidable: {
                uploadDir,
                maxFieldsSize: 10 * 1024 * 1024, // 10MB
                multiples: true
            }
        })
    );
}

async function checkUploadDir(path: string) {
    if (!fs.existsSync(path)) {
        await fs.promises.mkdir(path);
    }
}
