import serve from "koa-static";

export function useStatic(app: Application) {
    const staticPath = process.env.STATIC_FOLDER;
    const staticServe = serve(staticPath);
    app.use(staticServe);
}
