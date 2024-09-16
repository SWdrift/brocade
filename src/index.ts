import "./types";
import "dotenv/config";
import Koa from "koa";
import { useBodyParser } from "./plugin/bodyParser";
import { useRouter } from "./router";
import { useModules } from "./modules";
import { handleError } from "./public/error";
import { recordAppStart } from "./public/logger/modules/app";
import { verifyGlobalRequest } from "./public/validator";

(async function start() {
    const app = new Koa();

    handleError(app);
    verifyGlobalRequest(app);
    useBodyParser(app);
    useModules(app);
    useRouter(app);

    app.listen(process.env.API_PORT);
    recordAppStart();
})();
