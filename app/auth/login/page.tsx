import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/public/images/bg-login.webp";
// Using inline SVG icons to avoid adding react-icons dependency in this UI-only page

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign In - Gamingty</title>
      </Head>

      <div
        className="flex min-h-screen bg-cover bg-center z-0 overflow-x-hidden"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />

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

            <div className="absolute bottom-12 w-full left-0 lg:left-16">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 lg:justify-start">
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-gray-300 hover:text-emerald-500"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-gray-300 hover:text-emerald-500"
                  >
                    Terms and Conditions
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-sm text-gray-300 hover:text-emerald-500"
                  >
                    Contact Us
                  </Link>
                </div>

                <p className="text-base text-gray-200 dark:text-gray-400 max-w-lg leading-relaxed text-center lg:text-left">
                  The product names & logos used on this website are for
                  identification purposes only. All trademarks are property of
                  their respective owners.
                </p>
              </div>
            </div>
          </div>

          {/* Right form column — UI only, no state */}
          <div className="w-full lg:w-1/2 flex items-center justify-end py-12 z-10 mb-40 lg:mb-0">
            <div className="w-full lg:max-w-md">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center mb-6">
                  <Link href="/" className="inline-block">
                    <Image
                      src="/logo/logo-color.png"
                      alt="Gamingty Logo"
                      width={180}
                      height={50}
                      className="dark:hidden"
                    />
                    <Image
                      src="/logo/logo-dark.png"
                      alt="Gamingty Logo"
                      width={180}
                      height={50}
                      className="hidden dark:inline-block"
                    />
                  </Link>
                </div>

                {/* Sign In / Sign Up toggle (UI only) — Sign In selected on this page */}
                <div className="relative flex items-center justify-center bg-white dark:bg-[#1F1F1F] rounded-full p-1 mb-6">
                  {/* Selected (left) */}
                  <div className="absolute top-0 bottom-0 m-1 w-1/2 left-0 rounded-full bg-emerald-500" />
                  <Link
                    href="/auth/login"
                    className="relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Static sign-in form (UI only) */}
                <form
                  className="space-y-6"
                  // onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label
                      htmlFor="loginEmail"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="loginEmail"
                      name="loginEmail"
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full px-4 py-3 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[68%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-hidden
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-left mt-4!">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm underline font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full relative flex items-center justify-center py-3 px-5 font-semibold bg-emerald-500 text-white rounded-full hover:bg-emerald-600 focus:outline-none"
                  >
                    <span>Sign In</span>
                    <div className="absolute right-3 rounded-full text-emerald-500 bg-white p-1.5">
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
                    </div>
                  </button>
                </form>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 my-5">
                  By Clicking Sign In With Email, Google, Facebook, Or Apple,
                  You Agree To Gamingty's{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-emerald-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  And{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-emerald-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

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
