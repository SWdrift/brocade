import Router from "koa-router";
import { getEnv, EnvEnum } from "../public/env";

export const apiRouter = new Router({ prefix: getEnv(EnvEnum.API_PREFIX) });
export const webRouter = new Router();

export function useRouter(app: Application) {
    app.use(apiRouter.routes());
    app.use(apiRouter.allowedMethods());
    app.use(webRouter.routes());
    app.use(webRouter.allowedMethods());
}