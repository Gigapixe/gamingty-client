"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { customerLogin } from "@/services/customerService";

import { LoginResponse } from "@/types/auth";
import { useAuthStore } from "@/zustand/authStore";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth, setTempAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) return setError("Please enter a valid email");
    if (!password) return setError("Please enter your password");

    try {
      setLoading(true);
      const res = (await customerLogin(email, password)) as any;

      if (res?.status === "success" && res?.requiredOTP) {
        setTempAuth(email, res.token);
        router.push("/auth/verify-otp");
      } else if (res?.status === "success" && res?.token) {
        // Response contains user data directly, not nested
        const { token, status, ...userData } = res;
        setAuth(userData, token);
        router.push("/");
      } else {
        setError(res?.message || "Login failed");
      }
    } catch (err: any) {
      setError(err?.message || "Login request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        id="loginEmail"
        name="loginEmail"
        type="email"
        label="Email"
        placeholder="example@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="text-left">
        <a
          href="/auth/forgot-password"
          className="text-sm underline font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
        >
          Forgot Password?
        </a>
      </div>

      <Button
        type="submit"
        btnType="primary"
        className="w-full py-3 px-5"
        disabled={loading}
      >
        <span>{loading ? "Signing in..." : "Sign In"}</span>
      </Button>
    </form>
  );
}
