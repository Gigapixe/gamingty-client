import DashboardIcon from "@/public/icons/user/DashboardIcon";
import OrderIcon from "@/public/icons/user/OrderIcon";
import ReviewIcon from "@/public/icons/user/ReviewIcon";
import WishListIcon from "@/public/icons/user/WishListIcon";
import WalletIcon from "@/public/icons/user/WalletIcon";
import RedeemGiftCardIcon from "@/public/icons/user/RedeemGiftCardIcon";
import ReferralIcon from "@/public/icons/user/ReferralIcon";
import UpdateProfileIcon from "@/public/icons/user/UpdateProfileIcon";
import SupportTicketIcon from "@/public/icons/user/SupportTicketIcon";
import SecurityIcon from "@/public/icons/user/SecurityIcon";

export type NavItem = {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
};

export type NavGroup = {
  title: string;
  items: Array<{ label: string; href: string; icon?: React.ComponentType<any> }>;
};

export const navGroups: NavGroup[] = [
  {
    title: "Menu",
    items: [
      { label: "Dashboard", href: "/user/dashboard", icon: DashboardIcon },
      { label: "My Orders", href: "/user/my-orders", icon: OrderIcon },
      { label: "Reviews", href: "/user/my-reviews", icon: ReviewIcon },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Wishlist", href: "/user/wishlist", icon: WishListIcon },
      { label: "My Wallet", href: "/user/my-wallet", icon: WalletIcon },
      { label: "Redeem Card", href: "/user/redeem-card", icon: RedeemGiftCardIcon },
      { label: "Referral", href: "/user/affiliate", icon: ReferralIcon },
    ],
  },
  {
    title: "General",
    items: [
      { label: "Update Profile", href: "/user/update-profile", icon: UpdateProfileIcon },
      { label: "Support", href: "/user/open-ticket", icon: SupportTicketIcon },
      { label: "Security", href: "/user/security", icon: SecurityIcon },
    ],
  },
];

export const navItems: NavItem[] = navGroups.flatMap((g) =>
  g.items.map((i) => ({ name: i.label, href: i.href, icon: i.icon }))
);
