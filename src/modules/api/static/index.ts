import mount from "koa-mount";
import Joi from "joi";
import { apiRouter } from "../../../router";
import { verifyToken } from "../../../public/jwt";
import { getStaticServer } from "./service/staticServer";
import { verifyBodyRequest, verifyParamsRequest } from "../../../public/validator";
import { createAppError } from "../../../public/error/modules/appError";
import { generateDirHTML, generateDirJson } from "./service/dirGenerator";
import { getEnv, EnvEnum } from "../../../public/env";
import { saveFile } from "./service/fileService";
import type { ISchema } from "../../../public/validator/types";
import { createSuccessResponse } from "../../../public/response";

function defaultStaticFile(app: Application) {
    /**
     * Request
     */
    interface RequestStaticFilePost {
        /**
         * 文件列表
         */
        files: File[];
        /**
         * 文件夹列表
         */
        folders: Folder[];
    }
    interface File {
        /**
         * 文件内容（如果有）
         */
        content?: null | string;
        /**
         * 文件名
         */
        fileName: string;
        /**
         * 文件链接
         */
        fileUrl: string;
        [property: string]: any;
    }
    interface Folder {
        /**
         * 文件夹名称
         */
        folderName: string;
        /**
         * 文件夹链接
         */
        folderUrl: string;
    }
    const staticServer = getStaticServer();
    const apiPrefix = getEnv(EnvEnum.API_PREFIX);
    const url = `${apiPrefix}/static/file`;

    app.use(mount(url, staticServer));
    app.use(generateRespnse);

    async function generateRespnse(ctx: BodyContext<any>, next: Next) {
        if (ctx.path.startsWith(url)) {
            ctx.body = await generateStaticContent(ctx);
            await next();
        } else {
            await next();
        }
    }

    async function generateStaticContent(ctx: BodyContext<any>) {
        if (ctx.method === "POST") {
            return (await generateDirJson(ctx.url, url)) as RequestStaticFilePost;
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
            const path = ctx.state.validatedParam.path;
            if (Array.isArray(ctx.request.files.files)) {
                throw createAppError("Only one file can be uploaded");
            }
            await saveFile(ctx.request.files.files, path);
            ctx.body = createSuccessResponse();
            await next();
        }
    );
}

function defaultStaticDelete() {
    interface RequestStaticDelete {
        path: string;
    }
    const scehamStaticDelete: ISchema<RequestStaticDelete> = Joi.object({
        path: Joi.string().required()
    });
    apiRouter.post(
        "/static/delete",
        verifyToken,
        verifyBodyRequest(scehamStaticDelete),
        async (ctx: BodyContext<RequestStaticDelete>, next) => {
            const path = ctx.state.validatedBody.path;
            await saveFile(null, path, true);
            ctx.body = createSuccessResponse();
            await next();
        }
    );
}

function defaultStaticUpdate() {
    interface RequestStaticUpdate {
        path: string;
    }
    const scehamStaticUpdate: ISchema<RequestStaticUpdate> = Joi.object({
        path: Joi.string().required()
    });
    apiRouter.post(
        "/static/update",
        verifyToken,
        verifyParamsRequest(scehamStaticUpdate),
        async (ctx: ParamContext<RequestStaticUpdate>, next) => {
            if (!ctx.request.files?.files) {
                throw createAppError("No file uploaded");
            }
            const path = ctx.state.validatedParam.path;
            if (Array.isArray(ctx.request.files.files)) {
                throw createAppError("Only one file can be uploaded");
            }
            await saveFile(ctx.request.files.files, path, true);
            ctx.body = createSuccessResponse();
            await next();
        }
    );
}

export function defaultStatic(app: Application) {
    defaultStaticFile(app);
    defaultStaticUpload();
    defaultStaticUpdate();
    defaultStaticDelete();
}
