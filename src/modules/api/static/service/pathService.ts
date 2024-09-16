/**
 * @link https://chenshenhai.com/koa2-note/note/static/server.html
 */

import fs from "fs";

/**
 * 封装目录内容
 * @param url 当前请求的上下文中的 url，即 ctx.url
 * @param urlPrefix 请求静态资源的 url 前缀
 * @return 返回目录内容，封装成 HTML
 */
export async function generateDirContent(url: string, urlPrefix: string) {
    const reqPath = getReqPath(url, urlPrefix);
    // 遍历读取当前目录下的文件、子目录
    const contentList = getDirContent(reqPath);

    let html = `<ul>`;
    for (let [index, item] of contentList.entries()) {
        html = `${html}<li><a href="${url === "/" ? "" : url}/${item}">${item}</a>`;
    }
    html = `${html}</ul>`;

    return html;
}

function getReqPath(url: string, urlPrefix: string): string {
    const rootPath = process.cwd();
    const staticPath = process.env.STATIC_FOLDER;
    const reqPath = `${rootPath}/${staticPath}/${url.replace(urlPrefix, "")}`;

    return reqPath;
}

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
function getDirContent(reqPath: string) {
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
