import FacebookIcon from "@/public/icons/social/FacebookIcon";
import InstagramIcon from "@/public/icons/social/InstagramIcon";
import TelegramIcon from "@/public/icons/social/TelegramIcon";
import TwitterIcon from "@/public/icons/social/TwitterIcon";
import WhatsappIcon from "@/public/icons/social/WhatsappIcon";

const socialIcons = [
  {
    id: 1,
    name: "Facebook",
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/fleximartuae",
  },
  {
    id: 2,
    name: "Twitter",
    icon: <TwitterIcon />,
  },
  {
    id: 3,
    name: "Telegram",
    icon: <TelegramIcon />,
  },
  {
    id: 4,
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/fleximartae",
  },
  {
    id: 5,
    name: "Whatsapp",
    icon: <WhatsappIcon className="text-primary" />,
  },
];

const SocialLinks = () => {
  return (
    <div>
      <h1 className="mb-4">Follow us</h1>
      <div className="flex gap-4 items-center">
        {socialIcons.map((social) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
