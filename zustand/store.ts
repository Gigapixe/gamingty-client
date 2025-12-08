import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CategoryState {
  isOpen: boolean;
  openCategory: () => void;
  closeCategory: () => void;
}

export const useThemeStore = create<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "flex-theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
export const useCategoryStore = create<CategoryState>((set) => ({
  isOpen: false,
  openCategory: () => set({ isOpen: true }),
  closeCategory: () => set({ isOpen: false }),
}));
