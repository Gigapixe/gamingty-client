"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import backgroundImage from "@/public/images/form-bg.webp";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FullLogo from "@/components/ui/FullLogo";
import AuthFooterLinks from "@/components/auth/AuthFooterLinks";
import AuthToggle from "@/components/auth/AuthToggle";
import TermsText from "@/components/auth/TermsText";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (value: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    const newErrors: { [k: string]: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitSuccess(true);
      // Demo: in real app submit to API
      console.log("Forgot password requested for:", email);
    }
  };

  const isFormValid = email.trim() !== "" && validateEmail(email);

  return (
    <>
      <Head>
        <title>Forgot Password - Gamingty</title>
      </Head>

      <div
        className="relative flex min-h-screen bg-white dark:bg-[#161616] bg-cover bg-center z-0 overflow-x-hidden"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

        <div className="container mx-auto relative lg:flex">
          {/* Left hero */}
          <div className="z-10 w-full lg:w-1/2 flex flex-col text-white">
            <div className="flex flex-col items-start mt-10 lg:mt-48 relative">
              <p className="text-xl lg:text-2xl font-medium">
                Forgot Password?
              </p>
              <h1 className="text-4xl lg:text-6xl font-extrabold mt-2 relative z-10">
                Reset It Here
              </h1>
              <div className="bg-primary h-2 lg:h-4 w-1/3 -mt-2 lg:-mt-4 z-0" />
            </div>

            <AuthFooterLinks />
          </div>

          {/* Right form column */}
          <div className="w-full lg:w-1/2 flex items-center justify-end py-12 z-10 mb-40 lg:mb-0">
            <div className="w-full lg:max-w-md">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center mb-10 flex flex-col justify-center items-center">
                  <FullLogo />
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold ">Forgot Your Password?</h2>
                  <p className="text-gray-500 text-sm mt-1 dark:text-gray-300">
                    No worries! Enter your email to reset it.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <Button
                    type="submit"
                    btnType="primary"
                    disabled={!isFormValid}
                    className="w-full py-3 px-5"
                  >
                    <span>Send Reset Link</span>
                  </Button>
                </form>

                {submitSuccess && (
                  <p className="text-sm text-green-600 text-center mt-4">
                    If an account exists for this email, a reset link has been
                    sent (demo).
                  </p>
                )}

                <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                  Remembered your password?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Sign In
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
