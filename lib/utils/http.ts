import { apiClient, APIRequestProps } from "@/core";
import { useAuthStore } from "../store";

type WithoutMethodAndPath<T, D> = Omit<APIRequestProps<T, D>, 'method' | 'path'>;

export const http = {

    get: <T = any>(path: string, opts: WithoutMethodAndPath<T, any> = {}) =>
        apiClient<T>({
            method: 'get',
            path,
            accessToken: useAuthStore.getState().token,
            ...opts,
        }),

    delete: <T = any>(path: string, opts: WithoutMethodAndPath<T, any> = {}) =>
        apiClient<T>({
            method: 'delete',
            path,
            accessToken: useAuthStore.getState().token,
            ...opts,
        }),

    post: <T = any, D = any>(path: string, data?: D, opts: WithoutMethodAndPath<T, D> = {}) =>
        apiClient<T, D>({
            method: 'post',
            path,
            data,
            accessToken: useAuthStore.getState().token,
            ...opts,
        }),


    put: <T = any, D = any>(path: string, data?: D, opts: WithoutMethodAndPath<T, D> = {}) =>
        apiClient<T, D>({
            method: 'put',
            path,
            data,
            accessToken: useAuthStore.getState().token,
            ...opts,
        }),

    patch: <T = any, D = any>(path: string, data?: D, opts: WithoutMethodAndPath<T, D> = {}) =>
        apiClient<T, D>({
            method: 'patch',
            path,
            data,
            accessToken: useAuthStore.getState().token,
            ...opts,
        }),

};
