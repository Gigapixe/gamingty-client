"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const t = useTranslations("newsletter");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // api messages (we translate them client-side with Google)
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  // const { text: translatedApiError } = useDynamicTranslation(apiError);
  // const { text: translatedApiSuccess } = useDynamicTranslation(apiSuccess);

  useEffect(() => {
    if (error || success || apiError || apiSuccess) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
        setApiError("");
        setApiSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, apiError, apiSuccess]);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Invalid Email");
      setApiError("");
      setApiSuccess("");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    // try {

    //   const resp: any = await newsLetterSubscribe(email);

    //   const ok =
    //     resp?.success === true ||
    //     resp?.statusCode === 200 ||
    //     resp?.status === true;
    //   if (ok) {
    //     if (resp?.message) {
    //       setApiSuccess(resp.message);
    //     } else {
    //       setSuccess(t("successDefault"));
    //     }
    //     setEmail("");
    //   } else {
    //     if (resp?.message) {
    //       setApiError(resp.message);
    //     } else {
    //       setError(t("failureDefault"));
    //     }
    //   }
    // } catch (err) {
    //   console.error("Subscription error:", err);
    //   const msg = (err as any)?.message || t("genericError");
    //   setApiError(msg);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <div className="py-10 container mx-auto">
      <div className="bg-primary text-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 ">
        <div>
          <h1 className="text-xl lg:text-3xl font-medium">
            Subscribe to our Newsletter
          </h1>
          <p className="text-sm lg:text-base mt-1 max-w-md">
            Stay updated with the latest news and offers.
          </p>
        </div>
        <form
          onSubmit={handleSubscribe}
          className="flex items-center gap-2 w-full md:w-auto relative"
        >
          <div className="relative w-full md:min-w-96">
            {/* <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email here"
            className="w-full p-2 md:p-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            required
          /> */}
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              required
              className="py-3 rounded-full"
            />
            <div className="absolute left-4 top-12">
              {/* {apiError ? (
                <p className="text-warning-dark text-sm mt-2">
                  {translatedApiError}
                </p>
              ) : (
                error && (
                  <p className="text-warning-dark text-sm mt-2">{error}</p>
                )
              )}
              {apiSuccess ? (
                <p className="text-primary text-sm mt-2">
                  {translatedApiSuccess}
                </p>
              ) : (
                success && (
                  <p className="text-primary text-sm mt-2">{success}</p>
                )
              )} */}
            </div>
          </div>
          <Button
            type="submit"
            btnType="outline"
            disabled={loading}
            loading={loading}
            loadingText="Submitting..."
            className="absolute right-1 top-[5px]"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
