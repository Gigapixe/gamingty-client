"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { enable2FA, verify2FA, disable2FA } from "@/services/customerService";
import { useAuthStore } from "@/zustand/authStore";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";

export default function TwoFAUi() {
  const userDetails = useAuthStore((state) => state.user);
  // userId not required by the service; removed unused variable to avoid lint errors
  // Local state for 2FA enabled/disabled UI toggle
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  // Update is2FAEnabled when userDetails?.isTwoFactorEnabled becomes available
  React.useEffect(() => {
    if (typeof userDetails?.isTwoFactorEnabled !== "undefined") {
      setIs2FAEnabled(!!userDetails.isTwoFactorEnabled);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userDetails?.isTwoFactorEnabled]);

  const [setup, setSetup] = useState<null | {
    secret: string;
    qrCode: string;
  }>(null);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  // Disable flow needs a code input
  const [disableCode, setDisableCode] = useState("");
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
        toast.error(response.message || "Failed to start two-factor setup");
      }
    } catch (error) {
      toast.error("Failed to start two-factor setup");
    } finally {
      setEnableLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    setVerifying(true);
    try {
      // verify2FA only needs the code
      const response = await verify2FA(code);
      if (response.success) {
        toast.success("Two-factor authentication enabled");
        setSetup(null);
        setIs2FAEnabled(true); // Toggle UI to enabled
        // update zustand user state so UI elsewhere reflects new flag
        useAuthStore.setState((s) => ({
          user: s.user ? { ...s.user, isTwoFactorEnabled: true } : s.user,
        }));
      } else {
        toast.error(response.message || "Verification failed");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    if (disableCode.length !== 6) {
      toast.error("Enter a 6-digit code to disable two-factor authentication");
      return;
    }

    setDisableLoading(true);
    try {
      const response = await disable2FA(disableCode);
      if (response.success) {
        toast.success("Two-factor authentication disabled");
        setIs2FAEnabled(false); // Toggle UI to disabled
        setDisableCode("");
        // update zustand user state so UI elsewhere reflects new flag
        useAuthStore.setState((s) => ({
          user: s.user ? { ...s.user, isTwoFactorEnabled: false } : s.user,
        }));
      } else {
        toast.error(
          response.message || "Failed to disable two-factor authentication"
        );
      }
    } catch (error) {
      toast.error("Failed to disable two-factor authentication");
    } finally {
      setDisableLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-start gap-2">
        <h1 className="font-bold text-lg">Two-Factor Authentication</h1>
        <p
          className={`text-xs px-2 py-0.5 rounded ${
            is2FAEnabled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {is2FAEnabled ? "Enabled" : "Disabled"}
        </p>
      </div>
      {is2FAEnabled === false && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Enable two-factor authentication to add an extra layer of security
            to your account. When 2FA is enabled, you'll need to enter a
            verification code from your authenticator app when signing in.
          </p>
          <h1 className="font-medium mt-2 text-sm text-secondary">
            Add an extra layer of security to your account with two-factor
            authentication.
          </h1>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/80 rounded-full w-fit">
                <FiAlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="text-primary font-medium">
                <h2>Important</h2>
                <p className="text-xs mt-1">
                  Keep your secret code secure and back it up.
                </p>
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
            <h2 className="font-bold mb-2">Install an authenticator app</h2>
            <p className="text-sm mb-2">
              Install one of these authenticator apps on your phone:
            </p>
            <ul className="list-disc ml-6 text-sm">
              <li>Google Authenticator</li>
              <li>Authy</li>
              <li>Microsoft Authenticator</li>
            </ul>
          </div>
          <div className="mb-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background-dark-2 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1">
              <h2 className="font-bold mb-2">
                Step 2: Copy the secret or scan QR
              </h2>
              <p className="text-sm mb-2">
                Add the account in your authenticator app using the secret key
                or scan the QR code.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-mono text-xs select-all">
                  {setup.secret}
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(setup.secret);
                    toast.success("Secret copied to clipboard");
                  }}
                >
                  Copy Code
                </Button>
              </div>
              <p className="text-xs">
                If you can't scan the QR code, enter the secret manually.
              </p>
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
            <h2 className="font-bold mb-2">Step 3: Verify</h2>
            <p className="text-sm mb-2">
              Enter the 6-digit code from your authenticator app.
            </p>
            <Input
              id="code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Enter 6-digit code"
              disabled={verifying}
            />
            <Button
              onClick={handleVerify2FA}
              loading={verifying}
              disabled={code.length !== 6 || verifying}
              className="mt-2"
            >
              Verify code
            </Button>
          </div>
        </div>
      ) : is2FAEnabled ? (
        <div className="mt-4">
          <div className="p-4 rounded-lg border border-green-700 bg-green-50 dark:bg-green-900/20">
            <h2 className="font-bold text-green-700 dark:text-green-300 mb-2">
              Two-factor authentication is enabled for your account.
            </h2>
            <div className="flex items-center gap-2">
              <Input
                id="disable-code"
                type="text"
                maxLength={6}
                value={disableCode}
                onChange={(e) =>
                  setDisableCode(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="Enter 6-digit code to disable"
                disabled={disableLoading}
                className="w-40"
              />
              <Button
                onClick={handleDisable2FA}
                loading={disableLoading}
                disabled={disableLoading || disableCode.length !== 6}
              >
                Disable 2FA
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Button
            onClick={handleEnable2FA}
            loading={enableLoading}
            disabled={enableLoading}
            arrowIcon={true}
            className="!px-0 !pl-4 !pr-1.5"
          >
            Enable 2FA
          </Button>
        </div>
      )}
    </div>
  );
}
