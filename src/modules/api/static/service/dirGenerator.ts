/**
 * @link https://chenshenhai.com/koa2-note/note/static/server.html
 */
import { getDirContent } from "./dirService";
import { getEnv, EnvEnum } from "../../../../public/env";
import { ROOT_PATH } from "../../../../public/path";

/**
 * 生成目录HTML
 * @param url 当前请求的上下文中的 url，即 ctx.url
 * @param urlPrefix 请求静态资源的 url 前缀
 * @return 返回目录内容，封装成 HTML
 */
export async function generateDirHTML(url: string, urlPrefix: string) {
    const reqPath = getRelativePath(url, urlPrefix);
    // 遍历读取当前目录下的文件、子目录
    const contentList = await getDirContent(reqPath);
    if (typeof contentList === "string") {
        return contentList;
    }

    let html = `<span>folder:</span><br/>`;
    for (let item of contentList.dirList) {
        html = `${html}<a href="${getItemReqUrl(url, item)}">${item}</a><br/>`;
    }
    html = `${html}<span>file:</span><br/>`;
    for (let item of contentList.fileList) {
        html = `${html}<a href="${getItemReqUrl(url, item)}">${item}</a><br/>`;
    }

    html = `${html}`;

    return html;
}

/**
 * 生成目录JONS
 * @param url 当前请求的上下文中的 url，即 ctx.url
 * @param urlPrefix 请求静态资源的 url 前缀
 * @return 返回目录内容，封装成 JSON
 */
export async function generateDirJson(url: string, urlPrefix: string) {
    const relativePath = getRelativePath(url, urlPrefix);
    const absolutePath = getAbsolutePath(relativePath);
    const json: {
        files: { fileName: string; fileUrl: string; content?: string }[];
        folders: { folderName: string; folderUrl: string }[];
    } = {
        files: [],
        folders: []
    };
    // 遍历读取当前目录下的文件、子目录
    const contentList = await getDirContent(absolutePath);
    if (typeof contentList === "string") {
        json.files.push({
            fileName: getFileName(relativePath),
            fileUrl: absolutePath,
            content: contentList
        });
        return json;
    }

    for (let item of contentList.dirList) {
        json.folders.push({ folderName: item, folderUrl: getItemReqUrl(url, item) });
    }
    for (let item of contentList.fileList) {
        json.files.push({ fileName: item, fileUrl: getItemReqUrl(url, item) });
    }

    return json;
}

function getRelativePath(url: string, urlPrefix: string): string {
    const staticPath = getEnv(EnvEnum.STATIC_FOLDER);
    // 去除 & 后面的内容
    const cleanUrl = url.split("&")[0];
    // 替换 urlPrefix
    const path = `${staticPath}/${cleanUrl.replace(urlPrefix, "")}`;
    return path;
}

function getAbsolutePath(relativePath: string): string {
    const path = `${ROOT_PATH}/${relativePath}`;
    return path;
}

function getFileName(path: string): string {
    const dirName = path.split("/").pop();
    if (!dirName) {
        return path;
    }
    return dirName;
}

function getItemReqUrl(url: string, item: string): string {
    const reqUrl = `${url === "/" ? "" : url}/${item}`;

    return reqUrl;
}
