import Router from "koa-router";

export const router = new Router();

export function useRouter(app: Application) {
    app.use(router.routes());
    app.use(router.allowedMethods());
}
