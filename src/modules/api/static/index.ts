import mount from "koa-mount";
import { apiRouter } from "../../../router";
import { getStaticServer } from "./service/staticServer";
import { generateDirContent } from "./service/pathService";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = process.env.API_PREFIX;
    const url = `${apiPrefix}/static/file`;
    app.use(mount(url, staticServer));
    app.use(async (ctx, next) => {
        if (ctx.path.startsWith(url)) {
            ctx.body = await generateDirContent(ctx.url, url);
            await next();
        } else {
            await next();
        }
    });
}

function defaultStaticGet() {}

function defaultStaticUpload() {}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
    // defaultStaticFilePath();
}
