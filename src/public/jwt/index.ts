import { createAppError } from "../error/modules/appError";
import { decodeToken } from "./decode";
import { encodeToken } from "./encode";

export { decodeToken };
export { encodeToken };

export async function verifyToken(ctx: BodyContext<unknown>, next: Next) {
    const authorizationHeader = ctx.headers["authorization"];

    if (!authorizationHeader) {
        throw createAppError("Authorization header is missing", 401);
    }

    const token = authorizationHeader.split(" ")[1]; // Bearer token
    if (!token) {
        throw createAppError("Token is missing", 401);
    }

    try {
        const data = await decodeToken(token);
        ctx.state.token = data;
        return next();
    } catch (error) {
        throw createAppError("Invalid or expired token", 401);
    }
}
