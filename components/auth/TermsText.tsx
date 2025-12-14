import Link from "next/link";

export default function TermsText() {
  return (
    <p className="text-xs text-center text-gray-500 dark:text-gray-400 my-5">
      By Clicking Sign up with Email, Google, Facebook, or Apple, you agree to
      Gamingty's{" "}
      <Link
        href="/terms-and-conditions"
        className="text-emerald-600 hover:underline"
      >
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link href="/privacy-policy" className="text-emerald-600 hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
