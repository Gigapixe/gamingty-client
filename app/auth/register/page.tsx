import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/public/images/form-bg.webp";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FullLogo from "@/components/ui/FullLogo";
import AuthFooterLinks from "@/components/auth/AuthFooterLinks";
import AuthToggle from "@/components/auth/AuthToggle";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import TermsText from "@/components/auth/TermsText";

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
              <div className="bg-primary h-2 lg:h-4 w-1/3 -mt-2 lg:-mt-4 z-0" />
            </div>

            <AuthFooterLinks />
          </div>

          {/* Right form column */}
          <div className="w-full lg:w-1/2 flex items-center justify-end py-12 z-10 mb-40 lg:mb-0">
            <div className="w-full lg:max-w-md">
              <div className="bg-[#F8F8F8] dark:bg-[#141414] p-8 rounded-2xl dark:border dark:border-[#303030]">
                <div className="text-center mb-10">
                  <FullLogo />
                </div>

                <AuthToggle activeTab="signup" />

                {/* Static Sign Up form (UI only) */}
                <form
                  className="space-y-6"
                  // onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="example@mail.com"
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 555 123 4567"
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

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    className="px-4 py-3 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />

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

                  {/* <div className="mt-4 flex justify-center">
                    <div className="px-4 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                      reCAPTCHA placeholder
                    </div>
                  </div> */}

                  <Button
                    type="submit"
                    btnType="primary"
                    className="w-full py-3 px-5"
                  >
                    <span>Register</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
