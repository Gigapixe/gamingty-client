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

// Centralized link data
const footerSections: FooterSection[] = [
  {
    titleKey: "company",
    links: [
      { labelKey: "aboutUs", href: "/about-us" },
      { labelKey: "support", href: "/support" },
      { labelKey: "blog", href: "/blog" },
      { labelKey: "affiliate", href: "/fleximart-affiliate-program" },
    ],
  },
  {
    titleKey: "legal",
    links: [
      { labelKey: "privacyPolicy", href: "/privacy-policy" },
      { labelKey: "refundReturns", href: "/refund_returns" },
      { labelKey: "termsAndConditions", href: "/terms-and-conditions" },
      // partnership page coming soon
      { labelKey: "partnership", href: "/partnership" },
    ],
  },
  {
    titleKey: "help",
    links: [
      { labelKey: "contact", href: "/contact-us" },
      { labelKey: "securityTips", href: "/security-tips" },
      { labelKey: "kycAml", href: "/kyc-aml-policy" },
      { labelKey: "faq", href: "/faq" },
    ],
  },
  {
    titleKey: "contact",
    links: [
      {
        labelKey: "contactEmail",
        href: "mailto:support@fleximart.com",
        external: true,
        icon: EmailSupportIcon,
      },
      {
        labelKey: "contactPhone",
        href: "https://wa.me/971568346414",
        external: true,
        icon: WhatsappIcon,
      },
      {
        labelKey: "contactAddress",
        href: "#",
        icon: LocationIcon,
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
          <Icon className="w-4 h-4 text-white" />
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
    <div className="container mx-auto pb-10">
      <div>
        <FullLogo />
        <p className="text-sm text-left mt-4 capitalize">
          This website is owned and operated by Flexitech LLC FZ
        </p>
      </div>
      <hr className="border-border-light dark:border-border-dark my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.titleKey}>
            <h3 className="font-bold mb-2 lg:mb-4 text-xl">
              {section.titleKey}
            </h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, index) => (
                <li
                  key={index}
                  className={
                    (link.label && link.label.includes("Meydan")) ||
                    link.labelKey === "contactAddress"
                      ? "w-full md:w-52 lg:w-60"
                      : ""
                  }
                >
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
