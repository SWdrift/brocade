import { router } from "../../router/index";

export function useGlobal() {
    router.get("/", (ctx, next) => {
        ctx.body = "Hello World";
    });
}
