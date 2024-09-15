import "./types";
import "dotenv/config";
import Koa from "koa";
import { useBodyParser } from "./plugin/bodyParser";
import { useRouter } from "./router";
import { useModules } from "./modules";
import { useErrorHandle } from "./public/error";
import { recordAppStart } from "./public/logger/modules/app";

(async function start() {
    const app = new Koa();

    useBodyParser(app);
    useErrorHandle(app);
    useModules(app);
    useRouter(app);

    app.listen(process.env.BASE_PORT);
    recordAppStart();
})();