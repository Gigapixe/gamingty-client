import { AuthState, User } from "@/types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Cookie utilities
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      tempToken: null,
      tempEmail: null,
      setAuth: (user: User, token: string) => {
        setCookie("authToken", token, 7);
        set({
          user,
          token,
          isAuthenticated: true,
          tempToken: null,
          tempEmail: null,
        });
      },
      setTempAuth: (email: string, token: string) =>
        set({ tempEmail: email, tempToken: token }),
      clearTempAuth: () => set({ tempToken: null, tempEmail: null }),
      logout: () => {
        deleteCookie("authToken");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          tempToken: null,
          tempEmail: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
