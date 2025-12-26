"use client";

import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";

type NavItem = {
  name: string;
  href: string;
  icon?: any;
};

interface Props {
  items?: NavItem[];
  activePath?: string | null;
  onClose?: () => void;
  onLogout?: () => void;
}

const defaultItems: NavItem[] = [
  { name: "Dashboard", href: "/user/dashboard", icon: IoBagCheckOutline },
  { name: "My Orders", href: "/user/my-orders", icon: IoBagCheckOutline },
  { name: "My Wallet", href: "/user/my-wallet", icon: IoBagCheckOutline },
  { name: "Reviews", href: "/user/my-reviews", icon: AiOutlineHeart },
  { name: "Redeem Gift Card", href: "/user/redeem-card", icon: AiOutlineHeart },
  { name: "Referral", href: "/user/affiliate", icon: AiOutlineHeart },
  { name: "Wishlist", href: "/user/wishlist", icon: AiOutlineHeart },
  { name: "Update Profile", href: "/user/update-profile", icon: CiSettings },
  { name: "Support", href: "/user/open-ticket", icon: AiOutlineHeart },
  { name: "Security", href: "/user/security", icon: BsShieldCheck },
];

export default function UserNavLinks({
  items,
  activePath,
  onClose,
  onLogout,
}: Props) {
  const list = items || defaultItems;

  return (
    <div className="py-2">
      {list.map((item) => {
        const active = activePath === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-150 font-semibold w-full ${
              active
                ? "bg-primary/10 text-primary"
                : "text-[#6B7280] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-gray-800"
            }`}
            onClick={onClose}
          >
            {item.icon ? (
              <item.icon
                className={`w-5 h-5 mr-3 shrink-0 ${
                  active ? "text-primary" : "text-gray-500 dark:text-gray-400"
                }`}
              />
            ) : (
              <span className="w-5 h-5 mr-3 shrink-0" />
            )}
            <span className={`text-base ${active ? "font-semibold" : ""}`}>
              {item.name}
            </span>
          </Link>
        );
      })}

      <button
        onClick={() => onLogout && onLogout()}
        className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
      >
        <RiLogoutBoxRLine className="w-5 h-5 mr-3 shrink-0" />
        <span className="text-base">Logout</span>
      </button>
    </div>
  );
}
