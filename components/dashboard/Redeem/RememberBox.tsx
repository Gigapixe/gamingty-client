
import { FiSun } from "react-icons/fi";

export default function RememberBox() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-background-dark border border-[#DBDBDB] dark:border-gray-700 p-6 rounded-xl">
      <p className="font-semibold text-base text-[#161616] dark:text-[#FFFFFF] mb-4">
        Please Remember:
      </p>
      <ul className="space-y-3 text-sm text-[#6B7280] dark:text-[#E5E5E5]">
        <li className="flex items-center gap-3">
          <FiSun className="w-5 h-5 text-yellow-500 shrink-0" />
          <span>Gift cards are for single use only.</span>
        </li>
        <li className="flex items-center gap-3">
          <FiSun className="w-5 h-5 text-yellow-500 shrink-0" />
          <span>Expired cards cannot be redeemed.</span>
        </li>
        <li className="flex items-center gap-3">
          <FiSun className="w-5 h-5 text-yellow-500 shrink-0" />
          <span>The redeemed amount will be added to your Gamingty wallet.</span>
        </li>
      </ul>
    </div>
  );
}
