import { apiClient, APIRequestProps } from "@/core";

type WithoutMethodAndPath<T, D> = Omit<APIRequestProps<T, D>, 'method' | 'path'>;

export const http = {

    get: <T = any>(path: string, opts: WithoutMethodAndPath<T, any> = {}) =>
        apiClient<T>({ method: 'get', path, ...opts }),

    delete: <T = any>(path: string, opts: WithoutMethodAndPath<T, any> = {}) =>
        apiClient<T>({ method: 'delete', path, ...opts }),

    post: <T = any, D = any>(
        path: string,
        data?: D,
        opts: WithoutMethodAndPath<T, D> = {}
    ) => apiClient<T, D>({ method: 'post', path, data, ...opts }),


    put: <T = any, D = any>(
        path: string,
        data?: D,
        opts: WithoutMethodAndPath<T, D> = {}
    ) => apiClient<T, D>({ method: 'put', path, data, ...opts }),

    patch: <T = any, D = any>(
        path: string,
        data?: D,
        opts: WithoutMethodAndPath<T, D> = {}
    ) => apiClient<T, D>({ method: 'patch', path, data, ...opts }),
};
