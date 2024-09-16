import { createAppError } from "../error/modules/appError";
import { ISchema } from "./types";

/**
 * 验证中间件
 * @param schema 验证器
 * @returns 验证中间件
 */
export function verifyRequest(scheam: ISchema<object>) {
    return async function (ctx: Context<any>, next: Next) {
        const { error, value } = scheam.validate(ctx.request.body, {
            abortEarly: false
        });

        if (error) {
            // 如果有错误，构造错误详情并抛出自定义错误
            const details = error.details.map((detail) => ({
                message: detail.message,
                path: detail.path.join(".")
            }));
            throw createAppError(`Invalid input: ${JSON.stringify(details)}`, 500);
        }

        ctx.state.validatedData = value;

        await next();
    };
}
