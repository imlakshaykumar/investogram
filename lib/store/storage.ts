import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV();

export const mmkvStorage: StateStorage = {
    setItem: (item: string, value: string) => {
        storage.set(item, value);
    },
    getItem: (item: string) => {
        const value = storage.getString(item);
        return value || null;
    },
    removeItem: (item: string) => {
        storage.delete(item);
    },
}

export const storageKeys = {
    auth: '@auth',
} as const;
