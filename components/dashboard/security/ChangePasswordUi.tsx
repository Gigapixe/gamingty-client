"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/zustand/authStore";
import { changePassword as changePasswordService } from "@/services/customerService";

type Props = {
  onChangePassword?: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
};

export default function ChangePasswordUi({ onChangePassword }: Props) {
  const email = useAuthStore((s) => s.user?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    if (!currentPassword) return "Current password is required";
    if (!newPassword) return "New password is required";
    if (newPassword.length < 8)
      return "New password must be at least 8 characters";
    if (newPassword !== confirm) return "Passwords do not match";
    return null;
  };

  // Password rules copied from SignUpForm
  const passwordRules = [
    {
      label: "At least 8 characters",
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: "No spaces",
      test: (pw: string) => !pw.includes(" "),
    },
    {
      label: "At least one uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one number",
      test: (pw: string) => /[0-9]/.test(pw),
    },
    {
      label: (
        <span>
          {"At least one special character"}
          <span className="ml-1 text-gray-400">(!@#$%^&*)</span>
        </span>
      ),
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const passwordValid = passwordRules.every((rule) => rule.test(newPassword));

  const isFormValid =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length > 0 &&
    confirm.trim().length > 0 &&
    passwordValid &&
    newPassword === confirm &&
    !loading;

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);

    setPasswordTouched(true);

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    try {
      if (onChangePassword) {
        await onChangePassword(currentPassword, newPassword, confirm);
      } else {
        // Use the customer service which expects (email, currentPassword, newPassword)
        if (!email) throw new Error("No user email available");
        await changePasswordService(email, currentPassword, newPassword);
      }

      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Unable to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`
       `}
    >
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <hr className="mb-4 border-border-light dark:border-border-dark" />

      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 p-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 p-3 rounded">
          {success}
        </div>
      )}

      <div className="mb-4">
        <Input
          id="current-password"
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          autoComplete="current-password"
        />
      </div>

      <div className="mb-4">
        <Input
          id="new-password"
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (!passwordTouched) setPasswordTouched(true);
          }}
          placeholder="Enter new password"
          autoComplete="new-password"
        />
        <p className="text-xs text-(--color-muted,#9CA3AF) dark:text-(--color-muted-dark,#9CA3AF) mt-1">
          Your new password must meet the requirements below.
        </p>
        {/* Password rules */}
        <div className="mt-2 mb-2">
          <ul className="text-xs space-y-1">
            {passwordRules.map((rule, idx) => {
              const passed = rule.test(newPassword);
              return (
                <li
                  key={idx}
                  className={`flex items-center ${
                    passwordTouched
                      ? passed
                        ? "text-green-600"
                        : "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  <span className="mr-2">
                    {passwordTouched && passed
                      ? "✅"
                      : passwordTouched
                      ? "❌"
                      : "•"}
                  </span>
                  <span>{rule.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <Input
          id="confirm-password"
          label="Confirm new password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm new password"
          autoComplete="new-password"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          btnType="primary"
          loading={loading}
          loadingText="Updating..."
          type="submit"
          disabled={!isFormValid}
          arrowIcon={true}
        >
          Update password
        </Button>
      </div>
    </form>
  );
}
