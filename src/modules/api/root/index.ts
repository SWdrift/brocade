import { apiRouter } from "../../../router/index";

export function defaultGlobal() {
    apiRouter.get("/", (ctx, next) => {
        ctx.body = "Hello World";
    });
}
