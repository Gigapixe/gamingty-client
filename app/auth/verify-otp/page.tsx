"use client";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import backgroundImage from "@/public/images/form-bg.png";
import Button from "@/components/ui/Button";
import FullLogo from "@/components/ui/FullLogo";
import AuthFooterLinks from "@/components/auth/AuthFooterLinks";
import { useAuthStore } from "@/zustand/authStore";
import { resendOTP, verifyOTP } from "@/services/customerService";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { tempToken, tempEmail, setAuth, clearTempAuth, setTempAuth } =
    useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const maskEmail = (email?: string | null) => {
    if (!email) return "";
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    const [local, domain] = parts;

    if (local.length <= 2) {
      return `${local[0]}${"*".repeat(
        Math.max(1, local.length - 1)
      )}@${domain}`;
    }

    const stars = "*".repeat(Math.max(3, local.length - 2));
    return `${local[0]}${stars}${local[local.length - 1]}@${domain}`;
  };

  const maskedEmail = maskEmail(tempEmail);

  useEffect(() => {
    // Redirect if no temp auth data
    if (!tempToken || !tempEmail) {
      router.push("/auth/login");
    }
  }, [tempToken, tempEmail, router]);

  useEffect(() => {
    // Countdown timer for resend button
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendOTP = async () => {
    if (resendCountdown > 0 || !tempToken) return;

    setError(null);
    setResendLoading(true);

    try {
      const res: any = await resendOTP(tempToken);

      if (res?.status === "success" && res?.token) {
        // Update tempToken with the new token from response
        if (tempEmail) {
          setTempAuth(tempEmail, res.token);
        }
        setResendCountdown(30);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setError(res?.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      return setError("Please enter all 6 digits");
    }

    try {
      setLoading(true);
      const res = (await verifyOTP(tempToken as string, otpCode)) as any;

      if (res?.status === "success" && res?.token) {
        // Response contains user data directly, not nested
        const { token, status, ...userData } = res;
        setAuth(userData, token);
        clearTempAuth();
        router.push("/");
      } else {
        setError(res?.message || "Invalid OTP");
      }
    } catch (err: any) {
      setError(err?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = otp.every((digit) => digit !== "");

  return (
    <>
      <Head>
        <title>Verify OTP - Gamingty</title>
      </Head>

      <div
        className="relative flex min-h-screen bg-white dark:bg-[#161616] bg-cover bg-center z-0 overflow-x-hidden"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

        <div className="container mx-auto relative md:flex">
          {/* Left hero */}
          <div className="z-10 w-full md:w-1/2 flex flex-col text-white">
            <div className="flex flex-col items-start mt-10 md:mt-48 relative">
              <p className="text-xl md:text-2xl font-medium">Verify OTP</p>
              <h1 className="text-4xl md:text-6xl font-extrabold mt-2 relative z-10">
                A verification code has been sent to your email
              </h1>
              <div className="bg-primary h-2 md:h-4 w-1/3 -mt-2 md:-mt-4 z-0" />
            </div>

            <AuthFooterLinks />
          </div>

          {/* Right form column */}
          <div className="w-full md:w-1/2 flex items-center justify-end py-12 z-10 mb-40 md:mb-0">
            <div className="w-full md:max-w-[404px]">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center mb-10 flex flex-col justify-center items-center">
                  <FullLogo />
                </div>
                <h2 className="font-bold mb-4 text-lg">
                  Additional Verification Required!
                </h2>
                <div className="mb-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For your security, we’ve sent a 6-digit code to your{" "}
                    <span className="font-semibold">({maskedEmail})</span>{" "}
                    Please enter it below to continue.
                  </p>
                </div>

                <form className="" onSubmit={handleSubmit}>
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 text-center text-xl font-semibold bg-white dark:bg-[#1F1F1F] border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}

                  <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Didn't receive code?{" "}
                    <button
                      type="button"
                      className={`font-semibold ${
                        resendCountdown > 0 || resendLoading
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      }`}
                      onClick={handleResendOTP}
                      disabled={resendCountdown > 0 || resendLoading}
                    >
                      {resendLoading
                        ? "Sending..."
                        : resendCountdown > 0
                        ? `Resend (${resendCountdown}s)`
                        : "Resend Again"}
                    </button>
                  </p>
                  <Button
                    type="submit"
                    btnType="primary"
                    disabled={!isFormValid || loading}
                    className="w-full py-3 px-5"
                  >
                    <span>{loading ? "Verifying..." : "Verify OTP"}</span>{" "}
                  </Button>
                </form>

                <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                  Wrong email?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
              <p className="text-center text-gray-200 text-sm mt-8">
                © 2025 Gamingty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
