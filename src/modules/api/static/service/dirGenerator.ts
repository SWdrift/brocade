/**
 * @link https://chenshenhai.com/koa2-note/note/static/server.html
 */
import { getDirContent } from "./dirService";

/**
 * 生成目录HTML
 * @param url 当前请求的上下文中的 url，即 ctx.url
 * @param urlPrefix 请求静态资源的 url 前缀
 * @return 返回目录内容，封装成 HTML
 */
export async function generateDirHTML(url: string, urlPrefix: string) {
    const reqPath = getReqPath(url, urlPrefix);
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
    const reqPath = getReqPath(url, urlPrefix);
    // 遍历读取当前目录下的文件、子目录
    const contentList = await getDirContent(reqPath);
    if (typeof contentList === "string") {
        return contentList;
    }

    const json: {
        content: (
            | { fileName: string; fileUrl: string }
            | { folderName: string; folderUrl: string }
        )[];
    } = {
        content: []
    };
    for (let item of contentList.dirList) {
        json.content.push({ folderName: item, folderUrl: getItemReqUrl(url, item) });
    }
    for (let item of contentList.fileList) {
        json.content.push({ fileName: item, fileUrl: getItemReqUrl(url, item) });
    }

    return json;
}

function getReqPath(url: string, urlPrefix: string): string {
    const rootPath = process.cwd();
    const staticPath = process.env.STATIC_FOLDER;
    // 去除 & 后面的内容
    const cleanUrl = url.split("&")[0];
    // 替换 urlPrefix
    const reqPath = `${rootPath}/${staticPath}/${cleanUrl.replace(urlPrefix, "")}`;

    return reqPath;
}

function getItemReqUrl(url: string, item: string): string {
    const reqUrl = `${url === "/" ? "" : url}/${item}`;

    return reqUrl;
}
