import jwt from "jsonwebtoken";
import { CONFIG } from "./config";

/**
 * 生成 jwt token
 * @param data 要加密的数据
 * @returns jwt token
 */
export function encodeToken(data: Record<string, any>) {
    return "Bearer " + jwt.sign(data, CONFIG.PRIVATE_KEY, {
        expiresIn: CONFIG.EXPIRATION_TIME,
        algorithm: CONFIG.ALGORITHM
    });
}
