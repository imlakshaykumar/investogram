const urls = {
    dev: {
        http: '',
    },
    prod: {
        http: '',
    },
} as const;

const getEnv = (): keyof typeof urls => {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
        return 'dev';
    }
    if (process.env.NODE_ENV === 'development') {
        return 'dev';
    }
    if (process.env.NODE_ENV === 'production') {
        return 'prod';
    }

    console.warn('NODE_ENV not set. Defaulting to development.');

    return 'dev';
};

export const BASE_URL = urls[getEnv()].http;
