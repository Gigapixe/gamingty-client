// src/app/(dashboard)/redeem/RedeemCardClient.tsx
"use client";

import { useContext, useState } from "react";

import type { GiftCardPreview } from "@/services/redeemService";
import { previewGiftCard, redeemGiftCard } from "@/services/redeemService";
import toast from "react-hot-toast";
import RedeemHeader from "./RedeemHeader";
import RedeemForm from "./RedeemForm";
import RememberBox from "./RememberBox";
import GiftCardPreviewSection from "./GiftCardPreview";


export default function RedeemCardClient() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState<GiftCardPreview | null>(
    null
  );


  const handlePreviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Please enter a gift card code.");
      return;
    }

    setPreviewLoading(true);
    setShowPreview(false);
    setPreviewDetails(null);

    try {
      const response = await previewGiftCard({ cardNumber: code.trim() });

      if (response.status === "success") {
        setPreviewDetails(response.data);
        setShowPreview(true);
      } else {
        toast.error(response.message || "Failed to load gift card preview.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while fetching gift card preview."
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleRedeemConfirm = async () => {
    if (!code.trim()) {
      toast.error("Please enter a gift card code.");
      return;
    }

    setLoading(true);
    try {
      const response = await redeemGiftCard({ cardNumber: code.trim() });

      if (response.status === "success") {
        // dispatch({
        //   type: "UPDATE_USER_BALANCE",
        //   payload: response.data.newWalletBalance,
        // });

        toast.success(response.message || "Gift card redeemed successfully!");
        setCode("");
        setShowPreview(false);
        setPreviewDetails(null);
      } else {
        toast.error(response.message || "Failed to redeem gift card.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while redeeming the gift card."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    setPreviewDetails(null);
    setCode("");
  };

  return (
    <>
      <div className="bg-[#FFF] dark:bg-[#161616] p-6 rounded-xl shadow-sm border border-[#DBDBDB] dark:border-gray-700">
        {!showPreview ? (
          <>
            <RedeemHeader />

            <div className="space-y-8">
              <RedeemForm
                code={code}
                setCode={setCode}
                previewLoading={previewLoading}
                onSubmit={handlePreviewSubmit}
              />

              <RememberBox />
            </div>
          </>
        ) : (
          previewDetails && (
            <GiftCardPreviewSection
              code={code}
              previewDetails={previewDetails}
              loading={loading}
              onConfirm={handleRedeemConfirm}
              onCancel={handleCancelPreview}
            />
          )
        )}
      </div>
    </>
  );
}
