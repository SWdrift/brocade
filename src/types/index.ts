import { JwtPayload } from "jsonwebtoken";
import type Koa from "koa";

declare global {
    type Token = string | JwtPayload;

    type Application = Koa<Koa.DefaultState, Koa.DefaultContext>;

    type Context<T> = Koa.Context & { state: { validatedData: T; token: Token } };

    type Next = Koa.Next;

    namespace NodeJS {
        interface ProcessEnv extends MyCustomProcessEnv {}
    }
}

interface MyCustomProcessEnv {
    BASE_PORT?: number;
    NODE_ENV?: string;
    JWT_PRIVATE_KEY?: string;
    JWT_PUBLIC_KEY?: string;
    ADMIN_USER_NAME?: string;
    ADMIN_USER_PASSWORD?: string;
    ADMIN_USER_SALT?: string;
}
