import EmailSupportIcon from "@/public/icons/contact/EmailSupportIcon";

import Image from "next/image";
import Link from "next/link";
import LocationIcon from "@/public/icons/contact/LocationIcon";
import WhatsappIcon from "@/public/icons/social/WhatsappIcon";
import FullLogo from "@/components/ui/FullLogo";

// Define types for link sections
interface FooterLink {
  label?: string; // optional direct label
  labelKey?: string; // translation key to use instead of label
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}

// Centralized link data (labels are human-readable to match the design)
const footerSections: FooterSection[] = [
  {
    titleKey: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Security Tips", href: "/security-tips" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    titleKey: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-and-conditions" },
      { label: "Refund and Returns Policy", href: "/refund_returns" },
    ],
  },
  {
    titleKey: "Important Links",
    links: [
      { label: "KYC & AML Policy", href: "/kyc-aml-policy" },
      { label: "Support", href: "/support" },
      { label: "Partnership", href: "/partnership" },
    ],
  },
  {
    titleKey: "Quick Links",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      {
        label: "Gamingty Affiliate Program",
        href: "/gamingty-affiliate-program",
      },
    ],
  },
];

// Reusable LinkItem component
const LinkItem: React.FC<{ link: FooterLink }> = ({ link }) => {
  const Icon = link.icon;
  const content = (
    <div className="hover:text-primary-dark flex items-center gap-2 lg:max-w-60">
      {Icon && (
        <div className="bg-primary p-2 rounded-full">
          <Icon className="w-4 h-4 text-text dark:text-text-light" />
        </div>
      )}
      {link.labelKey ? <span>{link.labelKey}</span> : link.label}
    </div>
  );

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={link.href}>{content}</Link>
  );
};

const FooterLinks: React.FC = () => {
  return (
    <div className="container mx-auto pb-10 text-text dark:text-text-light">
      <div className="border-border-light dark:border-border-dark my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column: logo + description */}
        <div>
          <FullLogo />
          <p className="text-sm text-left mt-4 leading-relaxed max-w-[320px] text-text dark:text-text-light">
            Fuel your gaming sessions and app downloads with massive savings on
            iTunes, Google Play, Xbox, Steam, Amazon & more. Limited-time
            offers, global cards, instant delivery.
          </p>
        </div>

        {/* Link columns */}
        {footerSections.map((section) => (
          <div key={section.titleKey}>
            <h3 className="font-semibold mb-3 lg:mb-5 text-lg text-text dark:text-text-light">
              {section.titleKey}
            </h3>
            <ul className="space-y-2 text-sm text-text dark:text-text-light">
              {section.links.map((link, index) => (
                <li key={index}>
                  <LinkItem link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
