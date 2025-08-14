import { Nullable } from "@/constants";
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage, storageKeys } from "../storage";


interface AuthState {
    token: Nullable<string>;
}

interface AuthActions {
    setToken: (token: Nullable<string>) => void;
    resetToken: () => void;
}

const initialState: AuthState = {
    token: null,
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            ...initialState,
            setToken: (token: Nullable<string>) => set({ token }),
            resetToken: () => set({ ...initialState }),
        }),
        {
            name: storageKeys.auth,
            storage: createJSONStorage(() => mmkvStorage),
            partialize: (state: any) => ({
                token: state.token,
            }),
        }
    )
)
