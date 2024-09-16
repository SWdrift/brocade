import jwt, { JwtPayload } from "jsonwebtoken";
import { CONFIG } from "./config";

/**
 * 验证 jwt token
 * @param token 要验证的 jwt token
 * @returns 解密后的 jwt 数据
 */
export async function decodeToken(token: string): Promise<Token> {
    try {
        if (["RS256", "RS384", "RS512"].includes(CONFIG.ALGORITHM)) {
            // 非对称加密
            return verifyAsymmetricToken(token);
        } else {
            // 对称加密
            return verifySymmetricToken(token);
        }
    } catch (error) {
        throw new Error("Invalid token");
    }
}

function verifyAsymmetricToken(token: string) {
    return jwt.verify(token, CONFIG.PUBLIC_KEY, {
        maxAge: CONFIG.EXPIRATION_TIME,
        algorithms: [CONFIG.ALGORITHM]
    }) as Token;
}

function verifySymmetricToken(token: string) {
    return jwt.verify(token, CONFIG.PRIVATE_KEY, {
        maxAge: CONFIG.EXPIRATION_TIME,
        algorithms: [CONFIG.ALGORITHM]
    }) as Token;
}
