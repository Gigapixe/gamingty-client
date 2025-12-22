import Link from "next/link";

export default function AuthFooterLinks() {
  return (
    <div className="absolute bottom-12 w-full left-0 md:left-16">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:justify-start">
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

        <p className="text-base text-gray-400 max-w-lg leading-relaxed text-center md:text-left">
          The product names & logos used on this website are for identification
          purposes only. All trademarks are property of their respective owners.
        </p>
      </div>
    </div>
  );
}
