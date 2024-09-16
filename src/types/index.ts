import { JwtPayload } from "jsonwebtoken";
import type Koa from "koa";

declare global {
    type Token = string | JwtPayload;

    type Application = Koa<Koa.DefaultState, Koa.DefaultContext>;

    type BodyContext<T> = Koa.Context & { state: { validatedData: T; token: Token } };

    type ParamContext<T> = Koa.Context & { state: { validatedData: T; token: Token } };

    type Next = Koa.Next;

    namespace NodeJS {
        interface ProcessEnv extends MyCustomProcessEnv {}
    }
}

interface MyCustomProcessEnv {
    /** API 前缀 */
    API_PREFIX?: string;
    /** API 端口 */
    API_PORT?: number;
    /** 环境名称 */
    NODE_ENV?: string;
    /** jwt 私钥 */
    JWT_PRIVATE_KEY?: string;
    /** jwt 公钥 */
    JWT_PUBLIC_KEY?: string;
    /** 管理员用户名 */
    ADMIN_USER_NAME?: string;
    /** 管理员密码 */
    ADMIN_USER_PASSWORD?: string;
    /** 管理员盐值 */
    ADMIN_USER_SALT?: string;
    /** 静态文件目录 */
    STATIC_FOLDER?: string;
}
