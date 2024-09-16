import jwt from "jsonwebtoken";
import { CONFIG } from "./config";
import { createAppError } from "../error/modules/appError";

/**
 * 生成 jwt token
 * @param data 要加密的数据
 * @returns jwt token
 */
export async function encodeToken(data: Record<string, any>): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            CONFIG.PRIVATE_KEY,
            {
                expiresIn: CONFIG.EXPIRATION_TIME,
                algorithm: CONFIG.ALGORITHM
            },
            (error, encode) => {
                if (error) {
                    throw createAppError("jwt encode error");
                }
                resolve("Bearer " + encode);
            }
        );
    });
}
