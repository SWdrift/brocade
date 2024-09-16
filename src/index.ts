import "./types";
import "dotenv/config";
import Koa from "koa";
import { useBodyParser } from "./plugin/bodyParser";
import { useStatic } from "./plugin/static";
import { useRouter } from "./router";
import { useModules } from "./modules";
import { useErrorHandle } from "./public/error";
import { recordAppStart } from "./public/logger/modules/app";

(async function start() {
    const app = new Koa();

    useErrorHandle(app);
    useBodyParser(app);
    useStatic(app);
    useModules(app);
    useRouter(app);

    app.listen(process.env.BASE_PORT);
    recordAppStart();
})();
