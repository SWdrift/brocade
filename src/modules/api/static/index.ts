import mount from "koa-mount";
import { apiRouter } from "../../../router";
import { getStaticServer } from "./service/staticServer";
import { generateDirPage } from "./service/dirPage";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = process.env.API_PREFIX;
    const url = `${apiPrefix}/static/file`;

    app.use(mount(url, staticServer));
    app.use(responseDirPage);

    async function responseDirPage(ctx: Context<any>, next: Next) {
        if (ctx.path.startsWith(url)) {
            ctx.body = await generateDirPage(ctx.url, url);
            await next();
        } else {
            await next();
        }
    }
}

function defaultStaticUpload() {}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
}