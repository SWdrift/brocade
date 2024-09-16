import serve from "koa-static-server";

export function useStatic(app: Application) {
    const rootDir = process.env.STATIC_FOLDER;
    const rootPath = process.env.STATIC_PATH;
    const staticServe = serve({ rootDir, rootPath, last: true });
    app.use(staticServe);
}
