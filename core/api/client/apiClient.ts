
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ZodSchema } from 'zod';
import { handleApiError } from '.';
import { BASE_URL, Nullable } from '@/constants';
import { useAuthStore } from '@/lib';

export interface APIRequestProps<T, D> {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    data?: D;
    schema?: ZodSchema<T>;
    headers?: Record<string, string | null>;
    accessToken?: Nullable<string>;
    signal?: AbortSignal | null;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function apiClient<T, D = undefined>({
    method,
    path,
    data,
    schema,
    headers = {},
    accessToken,
    signal = null,
}: APIRequestProps<T, D>) {
    const token = accessToken || useAuthStore.getState().token;
    const axiosOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            ...(headers['Content-Type'] ? {} : { 'Content-Type': 'application/json' }),
            ...headers,
        },
        signal: signal || undefined,
    };

    try {
        // const url = `${BASE_URL}${path}`;

        if (__DEV__) {
            console.log(`[API] ${method.toUpperCase()} ${path}`);
            // console.log(`[API] ${method.toUpperCase()} ${url}`);
            if (data) console.log('[Payload]', data);
            if (signal) console.log('[Request] Using AbortSignal');
        }

        let response;
        if (['get', 'delete'].includes(method.toLowerCase())) {
            response = await axiosInstance[method]<T>(path, axiosOptions);
        } else {
            response = await axiosInstance[method]<T>(path, data, axiosOptions);
        }

        const responseData = response?.data;

        if (schema) {
            const parsed = schema.safeParse(responseData);

            if (!parsed.success) {
                console.error('[Zod Validation Error]', parsed.error.flatten());
                throw new Error('Invalid response format');
            }
            console.log('Parsed data (Schema)', parsed.data);
            return parsed?.data;
            // return { status: true, res: parsed.data, error: null };
        }
        console.log('Parsed data', responseData);
        return responseData;
        // return { status: true, res: responseData, error: null };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
}
