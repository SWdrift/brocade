/**
 * @link https://juejin.cn/post/7098208023113383973
 */
import log4js from "log4js";
import { config } from "./config";

log4js.configure(config);

export const baseLogger = log4js.getLogger();

const levels = {
    trace: log4js.levels.TRACE,
    debug: log4js.levels.DEBUG,
    info: log4js.levels.INFO,
    warn: log4js.levels.WARN,
    error: log4js.levels.ERROR,
    fatal: log4js.levels.FATAL
};

/**
 * 记录日志，debug级别
 * @param {string} content
 */
function debug(content: string) {
    let logger = log4js.getLogger();
    logger.level = levels.debug;
    logger.debug(content);
}

/**
 * 记录日志，info级别
 * @param {string} content
 */
function info(content: string) {
    let logger = log4js.getLogger("info");
    logger.level = levels.info;
    logger.info(content);
}

/**
 * 纪录日志，warn级别
 * @param {string} content
 */
function error(content: string) {
    let logger = log4js.getLogger("error");
    logger.level = levels.error;
    logger.error(content);
}

export const logger = {
    debug,
    info,
    error
};
