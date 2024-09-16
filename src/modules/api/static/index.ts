import koaBody from "koa-body";
import mount from "koa-mount";
import Joi from "joi";
import { apiRouter } from "../../../router";
import { verifyToken } from "../../../public/jwt";
import { getStaticServer } from "./service/staticServer";
import { verifyParamsRequest } from "../../../public/validator";
import { generateDirHTML, generateDirJson } from "./service/dirGenerator";
import { getEnv, EnvEnum } from "../../../public/env";
import type { ISchema } from "../../../public/validator/types";

function defaultStaticFile(app: Application) {
    const staticServer = getStaticServer();
    const apiPrefix = getEnv(EnvEnum.API_PREFIX);
    const url = `${apiPrefix}/static/file`;

    app.use(mount(url, staticServer));
    app.use(responseDirPage);

    async function responseDirPage(ctx: BodyContext<any>, next: Next) {
        if (ctx.path.startsWith(url)) {
            ctx.body = await generateDirPage(ctx);
            await next();
        } else {
            await next();
        }
    }

    async function generateDirPage(ctx: BodyContext<any>) {
        if (ctx.method === "POST") {
            return await generateDirJson(ctx.url, url);
        } else {
            return await generateDirHTML(ctx.url, url);
        }
    }
}

function defaultStaticUpload() {
    interface RequestStaticUpload {
        path: string;
    }
    const scehamStaticUpload: ISchema<RequestStaticUpload> = Joi.object({
        path: Joi.string().required()
    });
    const uploadDir = getEnv(EnvEnum.UPLOAD_FOLDER);
    apiRouter.post(
        "/static/upload",
        verifyToken,
        koaBody({
            multipart: true,
            formidable: {
                keepExtensions: true,
                maxFieldsSize: 10 * 1024 * 1024, // 10MB
                uploadDir
            }
        }),
        verifyParamsRequest(scehamStaticUpload),
        async (ctx, next) => {}
    );
}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
}
