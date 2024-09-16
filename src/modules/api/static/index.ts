import mount from "koa-mount";
import { apiRouter } from "../../../router";
import { getStaticServer } from "./staticServer";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = process.env.API_PREFIX;
    app.use(mount(`${apiPrefix}/static/file`, staticServer));
}

function defaultStaticGet() {}

function defaultStaticUpload() {}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
}
