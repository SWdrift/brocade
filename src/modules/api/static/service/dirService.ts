/**
 * @link https://chenshenhai.com/koa2-note/note/static/server.html
 */
import fs from "fs";
import { createAppError } from "../../../../public/error/modules/appError";

const MIMES: Record<string, string> = {
    css: "text/css",
    less: "text/css",
    gif: "image/gif",
    html: "text/html",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "text/javascript",
    json: "application/json",
    pdf: "application/pdf",
    png: "image/png",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tiff: "image/tiff",
    ts: "text/typescript",
    txt: "text/plain",
    wav: "audio/x-wav",
    wma: "audio/x-ms-wma",
    wmv: "video/x-ms-wmv",
    xml: "text/xml"
};

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param reqPath 请求资源的绝对路径
 * @return 目录内容列表
 */
export async function getDirContent(reqPath: string) {
    if (!await isDirectory(reqPath)) {
        return getFileContent(reqPath);
    }

    let files = fs.readdirSync(reqPath);

    let dirList = [],
        fileList = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let item = files[i];
        let itemArr = item.split(".");
        let itemMime = itemArr.length > 1 ? itemArr[itemArr.length - 1] : "undefined";

        if (typeof MIMES[itemMime] === "undefined") {
            dirList.push(files[i]);
        } else {
            fileList.push(files[i]);
        }
    }

    let result = dirList.concat(fileList);

    return result;
}

async function isDirectory(reqPath: string): Promise<boolean> {
    try {
        const stats = await fs.promises.lstat(reqPath);
        return stats.isDirectory();
    } catch (error) {
        throw createAppError("Directory not found");
    }
}

async function getFileContent(reqPath: string): Promise<string> {
    try {
        const content = await fs.promises.readFile(reqPath, "binary");
        return content;
    } catch (error) {
        throw createAppError("File not found");
    }
}
