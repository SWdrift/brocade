import mount from "koa-mount";
import Joi from "joi";
import { apiRouter } from "../../../router";
import { verifyToken } from "../../../public/jwt";
import { getStaticServer } from "./service/staticServer";
import { verifyParamsRequest } from "../../../public/validator";
import { createAppError } from "../../../public/error/modules/appError";
import { generateDirHTML, generateDirJson } from "./service/dirGenerator";
import { getEnv, EnvEnum } from "../../../public/env";
import { saveFile } from "./service/fileService";
import type { ISchema } from "../../../public/validator/types";
import { createSuccessResponse } from "../../../public/response";

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
    apiRouter.post(
        "/static/upload",
        verifyToken,
        verifyParamsRequest(scehamStaticUpload),
        async (ctx: ParamContext<RequestStaticUpload>, next) => {
            if (!ctx.request.files?.files) {
                throw createAppError("No file uploaded");
            }
            const path = ctx.state.validatedData.path;
            await saveFile(ctx.request.files.files, path);
            ctx.body = createSuccessResponse();
            await next();
        }
    );
}

function defaultStaticDelete() {}

function defaultStaticUpdate() {}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
    defaultStaticUpload();
}
