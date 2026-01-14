import { useAuthStore } from "@/zustand/authStore";

/**
 * Returns the current auth token from the zustand auth store.
 * Use `await getToken()` from services. Returns `null` if token isn't available.
 */
export async function getToken(): Promise<string | null> {
  // use getState() to read the store outside React components
  // Zustand's `create` returns a store with `getState()` method.
  const state = useAuthStore.getState();
  return state?.token ?? null;
}
