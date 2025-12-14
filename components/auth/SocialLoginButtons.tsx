import Button from "@/components/ui/Button";

export default function SocialLoginButtons() {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        type="button"
        btnType="outline"
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
      </Button>

      <Button
        type="button"
        btnType="outline"
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
      </Button>

      <Button
        type="button"
        btnType="outline"
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
      </Button>
    </div>
  );
}
