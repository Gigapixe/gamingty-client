"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import WarningIcon from "@/public/icons/WarningIcon";
import { enable2FA, verify2FA, disable2FA } from "@/services/authService";
import { useAuthStore } from "@/zustand/authStore";
import { fetchUserProfile } from "@/services";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import ArrowIcon from "@/public/icons/user/ArrowIcon";

export default function TwoFAUi() {
  const t = useTranslations("customer");
  const userDetails = useAuthStore((state) => state.user);
  const userId = userDetails?.id;
  // Local state for 2FA enabled/disabled UI toggle
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  // Update is2FAEnabled when userDetails?.is2FA becomes available
  React.useEffect(() => {
    if (typeof userDetails?.is2FA !== "undefined") {
      setIs2FAEnabled(!!userDetails.is2FA);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userDetails?.is2FA]);

  const [setup, setSetup] = useState<null | {
    secret: string;
    qrCode: string;
  }>(null);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  // Remove local error/success state, use toast instead
  const [enableLoading, setEnableLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);

  const handleEnable2FA = async () => {
    setEnableLoading(true);
    try {
      const response = await enable2FA();
      if (response.success && response.secret && response.qrCode) {
        setSetup({ secret: response.secret, qrCode: response.qrCode });
      } else {
        toast.error(response.message || t("twoFA.error.startFailed"));
      }
    } catch (error) {
      toast.error(t("twoFA.error.startFailed"));
    } finally {
      setEnableLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    setVerifying(true);
    try {
      if (userId === undefined) {
        toast.error(t("twoFA.error.missingUserId"));
        setVerifying(false);
        return;
      }
      const response = await verify2FA(code, userId);
      if (response.success) {
        toast.success(t("twoFA.success.enabled"));
        setSetup(null);
        setIs2FAEnabled(true); // Toggle UI to enabled
        await fetchUserProfile();
      } else {
        toast.error(response.message || t("twoFA.error.verifyFailed"));
      }
    } catch (error) {
      toast.error(t("twoFA.error.verifyFailed"));
    } finally {
      setVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    setDisableLoading(true);
    try {
      const response = await disable2FA();
      if (response.success) {
        toast.success(t("twoFA.success.disabled"));
        setIs2FAEnabled(false); // Toggle UI to disabled
        await fetchUserProfile();
      } else {
        toast.error(response.message || t("twoFA.error.disableFailed"));
      }
    } catch (error) {
      toast.error(t("twoFA.error.disableFailed"));
    } finally {
      setDisableLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-background dark:bg-background-dark-2 rounded-lg shadow-md">
      <div className="flex items-start gap-2">
        <h1 className="font-bold text-lg">{t("twoFA.title")}</h1>
        <p
          className={`text-xs px-2 py-0.5 rounded ${
            is2FAEnabled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {is2FAEnabled
            ? t("twoFA.status.enabled")
            : t("twoFA.status.disabled")}
        </p>
      </div>
      {is2FAEnabled === false && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t("twoFA.description")}
          </p>
          <h1 className="font-medium mt-2 text-sm text-secondary">
            Add an extra layer of security to your account with two-factor
            authentication.
          </h1>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/80 rounded-full w-fit">
                <WarningIcon className="h-5 w-5" fill="#FFFFFF" />
              </div>
              <div className="text-primary font-medium">
                <h2>{t("twoFA.warning.title")}</h2>
                <p className="text-xs mt-1">{t("twoFA.warning.description")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading skeleton while userDetails is loading */}
      {loading ? (
        <div className="mt-6 animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-2" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
        </div>
      ) : setup ? (
        <div className="mt-6">
          <div className="mb-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background-dark-2">
            <h2 className="font-bold mb-2">{t("twoFA.step1.title")}</h2>
            <p className="text-sm mb-2">{t("twoFA.step1.description")}</p>
            <ul className="list-disc ml-6 text-sm">
              <li>{t("twoFA.step1.app1")}</li>
              <li>{t("twoFA.step1.app2")}</li>
              <li>{t("twoFA.step1.app3")}</li>
            </ul>
          </div>
          <div className="mb-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background-dark-2 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1">
              <h2 className="font-bold mb-2">{t("twoFA.step2.title")}</h2>
              <p className="text-sm mb-2">{t("twoFA.step2.description")}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-mono text-xs select-all">
                  {setup.secret}
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(setup.secret);
                    toast.success(t("twoFA.copySecretSuccess"));
                  }}
                >
                  Copy Code
                </Button>
              </div>
              <p className="text-xs">{t("twoFA.scanFallback")}</p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-8">
              <img
                src={setup.qrCode}
                alt="QR Code"
                className="w-32 h-32 border rounded-lg"
              />
            </div>
          </div>
          <div className="mb-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background-dark-2">
            <h2 className="font-bold mb-2">{t("twoFA.step3.title")}</h2>
            <p className="text-sm mb-2">{t("twoFA.step3.description")}</p>
            <Input
              id="code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder={t("twoFA.placeholder.code")}
              disabled={verifying}
            />
            <Button
              onClick={handleVerify2FA}
              loading={verifying}
              disabled={code.length !== 6 || verifying}
              className="mt-2"
            >
              {t("twoFA.verifyButton")}
            </Button>
          </div>
        </div>
      ) : is2FAEnabled ? (
        <div className="mt-4">
          <div className="p-4 rounded-lg border border-green-700 bg-green-50 dark:bg-green-900/20">
            <h2 className="font-bold text-green-700 dark:text-green-300 mb-2">
              {t("twoFA.enabledMessage")}
            </h2>
            <Button
              onClick={handleDisable2FA}
              loading={disableLoading}
              disabled={disableLoading}
            >
              {t("twoFA.disableButton")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Button
            onClick={handleEnable2FA}
            loading={enableLoading}
            disabled={enableLoading}
            className="!px-0 !pl-4 !pr-1.5"
          >
            {t("twoFA.enableButton")}
            <span className="bg-white p-2 rounded-full">
              <ArrowIcon className="text-black w-3 h-3 p-0.5" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
