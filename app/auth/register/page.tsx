import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/public/images/form-bg.webp";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Gamingty</title>
      </Head>

      <div
        className="flex min-h-screen bg-white dark:bg-[#161616] bg-cover bg-center z-0 overflow-x-hidden"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="container mx-auto relative lg:flex">
          {/* Left hero */}
          <div className="z-10 w-full lg:w-1/2 flex flex-col text-white">
            <div className="flex flex-col items-start mt-10 lg:mt-48 relative">
              <p className="text-xl lg:text-2xl font-medium">Hello There</p>
              <h1 className="text-5xl lg:text-7xl font-extrabold mt-2 relative z-10">
                Create an account to get started
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

                <p className="text-base text-gray-400 max-w-lg leading-relaxed text-center lg:text-left">
                  The product names & logos used on this website are for
                  identification purposes only. All trademarks are property of
                  their respective owners.
                </p>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="w-full lg:w-1/2 flex items-center justify-end py-12 z-10 mb-40 lg:mb-0">
            <div className="w-full lg:max-w-md">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center mb-10">
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

                {/* Sign In / Sign Up toggle — Sign Up selected */}
                <div className="relative flex items-center justify-center bg-white dark:bg-[#1F1F1F] rounded-full p-1 mb-8">
                  {/* Right half selected highlight */}
                  <div className="absolute top-0 bottom-0 m-1 w-1/2 right-0 rounded-full bg-emerald-500" />

                  <Link
                    href="/auth/login"
                    className="relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Static Sign Up form (UI only) */}
                <form
                  className="space-y-6"
                  // onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full px-4 py-3 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
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
                      className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500"
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

                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500"
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

                  {/* Password hints (static) */}
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center text-green-600 dark:text-green-400">
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
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      At least 8 characters long
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
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
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Contains an uppercase letter
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
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
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Contains a number
                    </div>
                    <div className="flex items-center text-red-500 dark:text-red-400">
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
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      Contains a special character (!@#$%^&*-_+)
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div className="px-4 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                      reCAPTCHA placeholder
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full relative flex items-center justify-center py-3 px-5 font-semibold bg-emerald-500 text-white rounded-full hover:bg-emerald-600 focus:outline-none"
                  >
                    <span>Set Password</span>
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
                  By Clicking Sign up with Email, Google, Facebook, or Apple,
                  you agree to Gamingty's{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-emerald-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
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

                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Continue with Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33v7.03C18.34 21.19 22 17.06 22 12.07z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Continue with Google"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        fill="#EA4335"
                        d="M12 10.8v3.6h4.44c-.19 1.18-.94 2.18-2.01 2.87L16.5 19c1.66-1.53 2.61-3.95 2.61-6.7 0-.45-.04-.89-.12-1.31H12z"
                      />
                      <path
                        fill="#34A853"
                        d="M6.56 13.1c-.15-.45-.24-.92-.24-1.4s.09-.95.24-1.4L6.5 9h0C7.17 7.01 9.18 5.6 11.8 5.6c1.71 0 3.2.69 4.26 1.8l-1.9 1.84C13.9 8.07 12.95 7.6 11.8 7.6c-1.85 0-3.4 1.2-4.1 2.9l-.14.6z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M11.8 18.4c1.18 0 2.2-.38 3.01-1.03l1.96 1.92C15.95 20.4 13.95 21 11.8 21 9.05 21 6.62 19.7 5.47 17.33l1.96-1.62c.59 1.14 1.8 2.69 4.37 2.69z"
                      />
                      <path
                        fill="#4285F4"
                        d="M22 12c0-.64-.06-1.25-.17-1.85H12v3.52h5.8c-.25 1.42-1.04 2.64-2.24 3.46l1.95 1.52C20.4 17.85 22 15.16 22 12z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Continue with Apple"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-black dark:text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M16.365 1.43c0 1.14-.42 2.02-1.26 2.75-.86.73-1.95 1.26-3.13 1.26.13-1.22.9-2.08 1.7-2.8.8-.72 1.68-1.11 2.69-1.21zM20.7 7.68c-.53 1.25-1.42 2.29-2.61 3.12-1.18.84-2.53 1.22-3.79 1.11-.14-.85-.39-1.66-.77-2.37C13.5 8.8 12.8 8.2 12 8.2c-.84 0-1.63.6-2.44 1.5-.44.48-.79.99-1.05 1.52-.53 1.12-.92 2.38-1.16 3.78-.24 1.44-.18 2.67.17 3.66.8 2.21 2.94 3.72 5.25 3.72.7 0 1.4-.1 2.1-.32 1.28-.36 2.48-1.16 3.45-2.18.47-.5.85-1.02 1.12-1.58-.09-.02-.22-.02-.36-.02-1.57 0-2.36 1.04-3.92 1.04-.93 0-1.76-.45-2.23-1.17-.55-.86-.52-2.05.05-3.01.51-.9 1.35-1.79 2.47-1.79.52 0 1.05.18 1.6.56.4.27.85.35 1.31.35.35 0 .7-.06 1.04-.18.32-.12.61-.32.86-.58.44-.41.77-.95.98-1.51.34-.92.19-2.01-.48-2.94z" />
                    </svg>
                  </button>
                </div>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
