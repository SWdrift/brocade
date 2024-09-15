import log4js from "log4js";

/**
 * log4js 配置
 */
export const config: log4js.Configuration = {
    appenders: {
        console: { type: "console" },
        info: {
            type: "dateFile",
            filename: "logs/log-info.log",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        },
        error: {
            type: "dateFile",
            filename: "logs/log-error",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
        info: {
            appenders: ["info", "console"],
            level: "info"
        },
        error: {
            appenders: ["error", "console"],
            level: "error"
        }
    }
};
