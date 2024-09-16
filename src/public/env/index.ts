import { createAppError } from "../error/modules/appError";
import { EnvEnum } from "./enum";

export { EnvEnum };

export function getEnv<T extends unknown = string>(envName: EnvEnum): T {
    const env = process.env[envName];
    if (!env) {
        throw createAppError(`Environment variable ${envName} is not set.`);
    }
    return env as T;
}
