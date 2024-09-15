// 请求结果集
export enum ResultEnum {
    DATA_SUCCESS = 0,
    SUCCESS = 200,
    SERVER_ERROR = 500,
    SERVER_FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOKEN_OVERDUE = 886,
    TIMEOUT = 60000
}

// 请求方法
export enum RequestMethodEnum {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    PUT = "put",
    DELETE = "delete"
}

// 常用 contentType 类型
export enum ContentTypeEnum {
    // json
    JSON = "application/json;charset=UTF-8",
    // text
    TEXT = "text/plain;charset=UTF-8",
    // xml
    XML = "application/xml;charset=UTF-8",
    // application/x-www-form-urlencoded 一般配合 qs
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    // form-data 上传
    FORM_DATA = "multipart/form-data;charset=UTF-8",
    // octet-stream 二进制流
    BINARY = "application/octet-stream;charset=UTF-8"
}

export enum RequestErrorEnum {
    NETWORK = "ERR_NETWORK",
    TIMEOUT = "ERR_TIMEOUT",
    UNKNOWN = "ERR_UNKNOWN"
}
