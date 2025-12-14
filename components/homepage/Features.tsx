import DeliveryIcon from "@/public/icons/categories/DeliveryIcon";
import GiftCardIcon from "@/public/icons/categories/GiftCardIcon";
import SecureIcon from "@/public/icons/categories/SecureIcon";
import Support24Icon from "@/public/icons/categories/Support24Icon";

export default function Features() {
  const features = [
    { id: 1, title: "Instant Delivery", icon: <DeliveryIcon /> },
    { id: 2, title: "Support 24/7", icon: <Support24Icon /> },
    { id: 3, title: "Secure Payment", icon: <SecureIcon /> },
    { id: 4, title: "Gift Cards", icon: <GiftCardIcon /> },
  ];
  return (
    <div className="bg-secondary text-white py-2">
      <div className="grid grid-cols-2 justify-items-center md:flex md:justify-between md:items-center container mx-auto gap-4">
        {features.map((feature, index) => (
          <div key={feature.id} className="flex md:flex-col items-center gap-2">
            <div className="text-xl sm:text-2xl">{feature.icon}</div>
            <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center">
              {feature.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
