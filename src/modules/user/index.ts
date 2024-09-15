import Joi from "joi";
import { router } from "../../router/index";
import { verifyRequest } from "../../public/validator";
import { verifyToken, encodeToken } from "../../public/jwt";
import { ISchema } from "../../public/validator/types";
import { createAppError } from "../../public/error/modules/appError";

function defaultUserSaltGet() {
    interface RequestUserSaltGet {
        username: string;
        puzzling: boolean;
    }
    interface ResponseUserSaltGet {
        salt: string;
    }
    const schemaUserSaltGet: ISchema<RequestUserSaltGet> = Joi.object({
        username: Joi.string().min(3).max(64).required(),
        puzzling: Joi.boolean().default(false)
    });
    router.post(
        "/app/user/salt/get",
        verifyRequest(schemaUserSaltGet),
        (ctx: Context<RequestUserSaltGet>) => {
            const salt = getSalt(ctx.state.validatedData);
            const response: ResponseUserSaltGet = { salt };
            ctx.body = response;
        }
    );
    function getSalt(data: RequestUserSaltGet) {
        const { username } = data;
        if (data.puzzling) {
            if (username === process.env.ADMIN_USER_NAME) {
                return process.env.ADMIN_USER_SALT as string;
            }
        }

        throw createAppError("Invalid username", 401);
    }
}

function defaultUserLogin() {
    interface RequestUserLogin {
        username: string;
        password: string;
        puzzling: boolean;
        salt: string;
    }
    interface ResponseUserLogin {
        username: string;
        token: string;
    }
    const schemaUserLogin: ISchema<RequestUserLogin> = Joi.object({
        username: Joi.string().min(3).max(64).required(),
        password: Joi.string().min(3).max(64).required(),
        salt: Joi.string().min(3).max(64).required(),
        puzzling: Joi.boolean().default(false)
    });
    router.post(
        "/app/user/login",
        verifyRequest(schemaUserLogin),
        (ctx: Context<RequestUserLogin>) => {
            verifyPassword(ctx.state.validatedData);
            const { username } = ctx.state.validatedData;
            const token = encodeToken({ username });
            const response: ResponseUserLogin = { username, token };
            ctx.body = response;
        }
    );
    function verifyPassword(data: RequestUserLogin) {
        const { username, password, puzzling, salt } = data;
        if (puzzling) {
            if (
                username === process.env.ADMIN_USER_NAME &&
                password === process.env.ADMIN_USER_PASSWORD &&
                salt === process.env.ADMIN_USER_SALT
            ) {
                return true;
            }
        }

        throw createAppError("Invalid username or password", 401);
    }
}

function defaultUserTokenTest() {
    router.post("/app/user/token/test", verifyToken, (ctx) => {
        const data = ctx.state;
        ctx.body = data;
    });
}

export function useUser() {
    defaultUserSaltGet();
    defaultUserLogin();
    defaultUserTokenTest();
}