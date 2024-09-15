import axios, { AxiosInstance } from "axios";
import { ContentTypeEnum, RequestMethodEnum, ResultEnum } from "./enum/http";
import { ApiConfig, IHttpService } from "./interface/api";

export type { IHttpService };

function getConfig(config?: ApiConfig): ApiConfig {
    return {
        baseUrl: config?.baseUrl ?? "",
        timeout: config?.timeout ?? ResultEnum.TIMEOUT
    };
}

export class HttpServer implements IHttpService {
    private static instance: HttpServer;
    private axiosInstance: AxiosInstance;

    private constructor(config: ApiConfig) {
        this.axiosInstance = axios.create(getConfig(config));
    }

    public static getInstance(config?: ApiConfig): HttpServer {
        if (!HttpServer.instance) {
            HttpServer.instance = new HttpServer(getConfig(config));
        } else {
            HttpServer.instance.updateConfig(getConfig(config));
        }
        return HttpServer.instance;
    }

    private updateConfig(config: ApiConfig) {
        this.axiosInstance = axios.create(getConfig(config));
    }

    get<T>(url: string, params?: object) {
        return this.axiosInstance<T>({
            url: url,
            method: RequestMethodEnum.GET,
            params: params
        });
    }

    post<T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>) {
        return this.axiosInstance<T>({
            url: url,
            method: RequestMethodEnum.POST,
            data: data,
            headers: {
                "Content-Type": headersType || ContentTypeEnum.JSON,
                ...headers
            }
        });
    }

    patch<T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>) {
        return this.axiosInstance<T>({
            url: url,
            method: RequestMethodEnum.PATCH,
            data: data,
            headers: {
                "Content-Type": headersType || ContentTypeEnum.JSON,
                ...headers
            }
        });
    }

    put<T>(
        url: string,
        data?: object,
        headersType?: ContentTypeEnum,
        headers?: Record<string, string>
    ) {
        return this.axiosInstance<T>({
            url: url,
            method: RequestMethodEnum.PUT,
            data: data,
            headers: {
                "Content-Type": headersType || ContentTypeEnum.JSON,
                ...headers
            }
        });
    }

    del<T>(url: string, params?: object) {
        return this.axiosInstance<T>({
            url: url,
            method: RequestMethodEnum.DELETE,
            params
        });
    }
}
