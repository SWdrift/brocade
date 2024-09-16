import bodyParser from "koa-body";

export function useBodyParser(app: Application) {
    app.use(bodyParser());
}
