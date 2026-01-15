
import RedeemGiftCardIcon from "@/public/icons/user/RedeemGiftCardIcon";

export default function RedeemHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <RedeemGiftCardIcon className="h-7 w-7 text-primary" />
      <h1 className="text-xl lg:text-2xl font-semibold text-[#161616] dark:text-[#FFFFFF]">
        Redeem Your Gift Card
      </h1>
    </div>
  );
}
