import { JwtPayload } from "jsonwebtoken";
import type Koa from "koa";

declare global {
    type Token = string | JwtPayload;

    type Application = Koa<Koa.DefaultState, Koa.DefaultContext>;

    type BodyContext<T> = Koa.Context & { state: { validatedData: T; token: Token } };

    type ParamContext<T> = Koa.Context & { state: { validatedData: T; token: Token } };

    type Next = Koa.Next;
}
