import Link from "next/link";

interface AuthToggleProps {
  activeTab: "signin" | "signup";
}

export default function AuthToggle({ activeTab }: AuthToggleProps) {
  return (
    <div className="relative flex items-center justify-center bg-white dark:bg-[#1F1F1F] rounded-full p-1 mb-8">
      {/* Selected highlight */}
      <div
        className={`absolute top-0 bottom-0 m-1 w-1/2 rounded-full bg-emerald-500 transition-all duration-300 ${
          activeTab === "signin" ? "left-0" : "right-0"
        }`}
      />

      <Link
        href="/auth/login"
        className={`relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold transition-colors ${
          activeTab === "signin"
            ? "text-white"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        Sign In
      </Link>
      <Link
        href="/auth/register"
        className={`relative z-10 w-full text-center px-4 py-2 rounded-full font-semibold transition-colors ${
          activeTab === "signup"
            ? "text-white"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        Sign Up
      </Link>
    </div>
  );
}
