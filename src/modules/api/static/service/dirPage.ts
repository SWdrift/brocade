/**
 * @link https://chenshenhai.com/koa2-note/note/static/server.html
 */
import { getDirContent } from "./dirService";

/**
 * 封装目录内容
 * @param url 当前请求的上下文中的 url，即 ctx.url
 * @param urlPrefix 请求静态资源的 url 前缀
 * @return 返回目录内容，封装成 HTML
 */
export async function generateDirPage(url: string, urlPrefix: string) {
    const reqPath = getReqPath(url, urlPrefix);
    // 遍历读取当前目录下的文件、子目录
    const contentList = getDirContent(reqPath);

    let html = ``;
    for (let [index, item] of contentList.entries()) {
        html = `${html}<a href="${url === "/" ? "" : url}/${item}">${item}</a><br/>`;
    }
    html = `${html}`;
    // let html = `<ul>`;
    // for (let [index, item] of contentList.entries()) {
    //     html = `${html}<li><a href="${url === "/" ? "" : url}/${item}">${item}</a>`;
    // }
    // html = `${html}</ul>`;

    return html;
}

function getReqPath(url: string, urlPrefix: string): string {
    const rootPath = process.cwd();
    const staticPath = process.env.STATIC_FOLDER;
    const reqPath = `${rootPath}/${staticPath}/${url.replace(urlPrefix, "")}`;

    return reqPath;
}
