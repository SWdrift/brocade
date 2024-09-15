import { hash, genSalt } from "bcryptjs";

/**
 * 加密密码
 * @param password - 原始密码
 * @param salt - 盐
 * @returns Promise<string> - 返回加密后的密码
 */
export const encryptPassword = async (password: string, salt: string): Promise<string> => {
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

/**
 * 生成盐
 * @returns Promise<string> - 返回生成的盐
 */
export const generateSalt = async (): Promise<string> => {
    const salt = await genSalt(10);
    return salt;
};
