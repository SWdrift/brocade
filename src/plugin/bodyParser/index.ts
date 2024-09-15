import bodyParser from "koa-bodyparser";

export function useBodyParser(app: Application) {
    app.use(bodyParser());
}
