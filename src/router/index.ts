import Router from "koa-router";

export const apiRouter = new Router({ prefix: process.env.API_PREFIX });
export const webRouter = new Router();

export function useRouter(app: Application) {
    app.use(apiRouter.routes());
    app.use(apiRouter.allowedMethods());
    app.use(webRouter.routes());
    app.use(webRouter.allowedMethods());
}
