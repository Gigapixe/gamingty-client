import Head from "next/head";

import Link from "next/link";
import backgroundImage from "@/public/images/bg-login.webp";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FullLogo from "@/components/ui/FullLogo";
import AuthFooterLinks from "@/components/auth/AuthFooterLinks";
import AuthToggle from "@/components/auth/AuthToggle";
import TermsText from "@/components/auth/TermsText";
// Using inline SVG icons to avoid adding react-icons dependency in this UI-only page

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign In - Gamingty</title>
      </Head>

      <div
        className="relative flex min-h-screen bg-cover bg-center z-0 overflow-x-hidden"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

        <div className="container mx-auto relative lg:flex">
          {/* Left hero column */}
          <div className="z-10 w-full lg:w-1/2 flex flex-col text-white">
            <div className="flex flex-col items-start mt-10 lg:mt-48 relative">
              <p className="text-xl lg:text-2xl font-medium">Hello There</p>
              <h1 className="text-6xl lg:text-7xl font-extrabold mt-2 relative z-10">
                Welcome Back!
              </h1>
              <div className="bg-emerald-500 h-2 lg:h-4 w-1/3 -mt-2 lg:-mt-4 z-0" />
            </div>

            <AuthFooterLinks />
          </div>

          {/* Right form column — UI only, no state */}
          <div className="w-full lg:w-1/2 flex items-center justify-end py-12 z-10 mb-40 lg:mb-0">
            <div className="w-full lg:max-w-md">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center flex flex-col justify-center items-center mb-10">
                  <FullLogo />
                </div>

                <AuthToggle activeTab="signin" />

                {/* Static sign-in form (UI only) */}
                <form
                  className="space-y-6"
                  // onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    id="loginEmail"
                    name="loginEmail"
                    type="email"
                    label="Email"
                    placeholder="example@mail.com"
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <div className="text-left mt-4!">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm underline font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    btnType="primary"
                    className="w-full py-3 px-5"
                  >
                    <span>Sign In</span>
                    {/* <div className="absolute right-3 rounded-full text-emerald-500 bg-white p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </div> */}
                  </Button>
                </form>

                <TermsText />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-[#F8F8F8] dark:bg-[#141414] text-gray-500 dark:text-gray-400">
                      Or Continue With
                    </span>
                  </div>
                </div>

                <p className="text-center text-gray-200 text-sm mt-8">
                  © 2025 Gamingty. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
