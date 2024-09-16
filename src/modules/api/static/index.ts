import mount from "koa-mount";
import { apiRouter } from "../../../router";
import { getStaticServer } from "./service/staticServer";
import { generateDirHTML, generateDirJson } from "./service/dirGenerator";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = process.env.API_PREFIX;
    const url = `${apiPrefix}/static/file`;

    app.use(mount(url, staticServer));
    app.use(responseDirPage);

    async function responseDirPage(ctx: BodyContext<any>, next: Next) {
        if (ctx.path.startsWith(url)) {
            ctx.body = await generateDirPage(ctx);
            await next();
        } else {
            await next();
        }
    }

    async function generateDirPage(ctx: BodyContext<any>) {
        if (ctx.method === "POST") {
            return await generateDirJson(ctx.url, url);
        } else {
            return await generateDirHTML(ctx.url, url);
        }
    }
}

function defaultStaticUpload() {
    apiRouter.post("/static/upload", async (ctx, next) => {});
}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
}
