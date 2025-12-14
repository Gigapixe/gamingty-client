"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import backgroundImage from "@/public/images/form-bg.webp";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FullLogo from "@/components/ui/FullLogo";
import CountryPhoneInput from "@/components/ui/CountryPhoneInput";
import AuthFooterLinks from "@/components/auth/AuthFooterLinks";
import AuthToggle from "@/components/auth/AuthToggle";
import TermsText from "@/components/auth/TermsText";
import { parsePhoneNumber } from "libphonenumber-js";

export default function RegisterPage() {
  function PasswordHint({ label, test }: { label: string; test: boolean }) {
    return (
      <div
        className={`flex items-center ${
          test
            ? "text-green-600 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {test ? (
            <path d="M20 6L9 17l-5-5" />
          ) : (
            <path d="M18 6L6 18M6 6l12 12" />
          )}
        </svg>
        {label}
      </div>
    );
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (value: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const validatePhone = (fullNumber: string) => {
    try {
      const parsed = parsePhoneNumber(fullNumber);
      return parsed && parsed.isValid();
    } catch {
      return false;
    }
  };

  const validatePassword = (pwd: string) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*\-\_\+]/.test(pwd)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const newErrors: { [k: string]: string } = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Please enter a valid email";

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(phone))
      newErrors.phone = "Please enter a valid phone number";

    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password))
      newErrors.password = "Password does not meet the requirements";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitSuccess(true);
      // In a real app, submit data here
      console.log({ name, email, phone, phoneCountry, password });
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    validateEmail(email) &&
    phone.trim() !== "" &&
    validatePhone(phone) &&
    validatePassword(password) &&
    confirmPassword === password;

  return (
    <>
      <Head>
        <title>Sign Up - Gamingty</title>
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
              <p className="text-xl lg:text-2xl font-medium">Hello There</p>
              <h1 className="text-4xl lg:text-6xl font-extrabold mt-2 relative z-10">
                Create an account to get started
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

                <AuthToggle activeTab="signup" />

                {/* Sign Up form with validation */}
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

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

                  <CountryPhoneInput
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    placeholder="555 123 4567"
                    onChange={(fullNumber, country) => {
                      setPhone(fullNumber);
                      setPhoneCountry(country);
                      setErrors((s) => ({ ...s, phone: undefined }));
                    }}
                    error={errors.phone}
                  />

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  {/* Password hints (dynamic) */}
                  <div className="mt-2 space-y-1 text-xs">
                    <PasswordHint
                      label="At least 8 characters long"
                      test={password.length >= 8}
                    />
                    <PasswordHint
                      label="Contains an uppercase letter"
                      test={/[A-Z]/.test(password)}
                    />
                    <PasswordHint
                      label="Contains a number"
                      test={/[0-9]/.test(password)}
                    />
                    <PasswordHint
                      label="Contains a special character (!@#$%^&*\-_+)"
                      test={/[!@#$%^&*\-\_\+]/.test(password)}
                    />
                  </div>

                  {/* <div className="mt-4 flex justify-center">
                    <div className="px-4 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                      reCAPTCHA placeholder
                    </div>
                  </div> */}

                  <Button
                    type="submit"
                    btnType="primary"
                    disabled={!isFormValid}
                    className="w-full py-3 px-5"
                  >
                    <span>Register</span>
                  </Button>
                </form>

                <TermsText />

                {submitSuccess && (
                  <p className="text-sm text-green-600 text-center mt-4">
                    Registration data is valid (demo).
                  </p>
                )}

                {/* <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-[#F8F8F8] dark:bg-[#141414] text-gray-500 dark:text-gray-400">
                      Or Continue With
                    </span>
                  </div>
                </div> */}

                {/* <SocialLoginButtons /> */}

                <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
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
