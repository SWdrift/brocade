import { logger } from "../logger";
import { getEnv, EnvEnum } from "../../../public/env";

export function recordAppStart() {
    logger.info(`App started`);
    logger.info(`Mode: ${getEnv(EnvEnum.NODE_ENV)}`);
    logger.info(`Server running at http://localhost:${getEnv(EnvEnum.API_PORT)}`);
}
