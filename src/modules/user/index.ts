import Joi from "joi";
import { apiRouter } from "../../router/index";
import { verifyBodyRequest } from "../../public/validator";
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
    apiRouter.post(
        "/app/user/salt/get",
        verifyBodyRequest(schemaUserSaltGet),
        (ctx: BodyContext<RequestUserSaltGet>) => {
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
    apiRouter.post(
        "/app/user/login",
        verifyBodyRequest(schemaUserLogin),
        async (ctx: BodyContext<RequestUserLogin>) => {
            verifyPassword(ctx.state.validatedData);
            const { username } = ctx.state.validatedData;
            const token = await encodeToken({ username });
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
    apiRouter.post("/app/user/token/test", verifyToken, (ctx) => {
        const data = ctx.state;
        ctx.body = data;
    });
}

export function defaultUser() {
    defaultUserSaltGet();
    defaultUserLogin();
    defaultUserTokenTest();
}