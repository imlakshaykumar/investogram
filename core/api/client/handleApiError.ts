import { useAuthStore } from '@/lib';
import { AxiosError } from 'axios';
// import { useAuthStore } from '@/lib/store/authStore';


export const handleApiError = (error: AxiosError<any>) => {
    const response = error?.response;

    if (__DEV__) {
        console.error('[API ERROR]', {
            message: error.message,
            code: error.code,
            url: response?.config?.url,
            status: response?.status,
            data: response?.data,
        });
    }

    // Network / Timeout errors
    if (!response) {
        if (error.code === 'ECONNABORTED') {
            return { error: 'Request timed out. Please try again.', status: false, response: null };
        }
        return {
            error: error?.message || 'Network error',
            status: false,
            response: null,
        };
    }

    // Auth errors
    if ([401, 403].includes(response.status)) {
        useAuthStore.getState().resetToken();
        return {
            error: 'Session expired. Please log in again.',
            status: false,
            response: null,
        };
    }

    // Other errors
    const message = extractErrorMessage(response.data);
    return {
        error: message,
        status: false,
        response: null,
    };
};

const extractErrorMessage = (data: any): string => {
    if (!data) { return 'Something went wrong'; }

    if (typeof data === 'string') { return data; }
    if (data?.msg) { return data.msg; }
    if (data?.message) { return data.message; }
    if (data?.error) { return data.error; }

    if (Array.isArray(data)) { return data.join(', '); }


    if (typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        const firstValue = data[firstKey];
        if (typeof firstValue === 'string') { return firstValue; }
        if (Array.isArray(firstValue)) { return firstValue[0]; }
    }

    return 'Something went wrong';
};
