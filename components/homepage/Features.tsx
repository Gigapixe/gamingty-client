import DeliveryIcon from "@/public/icons/categories/DeliveryIcon";
import GiftCardIcon from "@/public/icons/categories/GiftCardIcon";
import SecureIcon from "@/public/icons/categories/SecureIcon";
import Support24Icon from "@/public/icons/categories/Support24Icon";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Instant Delivery",
      icon: <DeliveryIcon className="h-8 w-8 lg:h-6 lg:w-6" />,
    },
    {
      id: 2,
      title: "24/7 Support",
      icon: <Support24Icon className="h-8 w-8 lg:h-6 lg:w-6" />,
    },
    {
      id: 3,
      title: "Gift Cards",
      icon: <GiftCardIcon className="h-8 w-8 lg:h-6 lg:w-6" />,
    },
    {
      id: 4,
      title: "Secure Payment",
      icon: <SecureIcon className="h-8 w-8 lg:h-6 lg:w-6" />,
    },
  ];
  return (
    <div className="bg-secondary text-white py-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 py-3 lg:py-3 lg:flex lg:items-center lg:justify-between">
          {features.map((feature, index) => (
            <div
              key={index}
              className={` ${
                index > 0 ? "lg:border-l lg:border-white/20 lg:pl-6" : ""
              }`}
            >
              {/* On mobile: left column items are left-aligned, right column items are right-aligned; on lg each item centers within its column */}
              <div
                className={`flex items-center gap-3 sm:gap-4 w-full ${
                  index % 2 === 0 ? "justify-start" : "justify-center"
                } lg:justify-between`}
              >
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <h1 className="text-sm lg:text-base font-bold whitespace-nowrap">
                    {feature.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
