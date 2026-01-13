import ChangePasswordUi from "@/components/dashboard/security/ChangePasswordUi";
import { FiShield } from "react-icons/fi";

export default function SecurityPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <FiShield className="text-2xl text-gray-700 dark:text-[#FFFFFF]" />
        <h1 className="text-2xl font-bold">Security Setting</h1>
      </div>
      <div className="p-4 md:p-6 border border-border-light dark:border-border-dark rounded-xl">
        <ChangePasswordUi />
      </div>
    </div>
  );
}
