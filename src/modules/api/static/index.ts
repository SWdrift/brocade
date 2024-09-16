import mount from "koa-mount";
import { getStaticServer } from "./staticServer";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = process.env.API_PREFIX;
    app.use(mount(`${apiPrefix}/static/file`, staticServer));
}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
}
