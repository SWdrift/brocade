import { router } from "../../router/index";

export function defaultGlobal() {
    router.get("/", (ctx, next) => {
        ctx.body = "Hello World";
    });
}
