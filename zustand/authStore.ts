import { AuthState, User } from "@/types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      tempToken: null,
      tempEmail: null,
      setAuth: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          tempToken: null,
          tempEmail: null,
        }),
      setTempAuth: (email: string, token: string) =>
        set({ tempEmail: email, tempToken: token }),
      clearTempAuth: () => set({ tempToken: null, tempEmail: null }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          tempToken: null,
          tempEmail: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
