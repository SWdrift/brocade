import { logger } from "../logger";

export function recordAppStart() {
    logger.info(`App started`);
    logger.info(`Mode: ${process.env.NODE_ENV}`);
    logger.info(`Server running at http://localhost:${process.env.BASE_PORT}`);
}
