import { ContentTypeEnum } from "../enum/http";

export interface IHttpService {
    get<T>(url: string, params?: object): Promise<ApiRespond<T>>;
    post<T>(
        url: string,
        data?: object,
        headersType?: string,
        headers?: Record<string, string>
    ): Promise<ApiRespond<T>>;
    patch<T>(
        url: string,
        data?: object,
        headersType?: string,
        headers?: Record<string, string>
    ): Promise<ApiRespond<T>>;
    put<T>(
        url: string,
        data?: object,
        headersType?: ContentTypeEnum,
        headers?: Record<string, string>
    ): Promise<ApiRespond<T>>;
    del<T>(url: string, params?: object): Promise<ApiRespond<T>>;
}

export interface ApiConfig {
    baseUrl?: string;
    timeout?: number;
}

export interface ApiRespond<T> {
    data: T;
    [key: string]: any;
}
