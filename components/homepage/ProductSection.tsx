import Image from "next/image";
import Link from "next/link";

export default function ProductSection() {
  const products = [
    {
      id: 1,
      alt: "Google Play Gift Card",
      url: "/products/google.png",
      link: "/category/google-play",
    },
    {
      id: 2,
      alt: "iTunes Gift Card",
      url: "/products/itunes.png",
      link: "/category/app-store-i-tunes-gift-cards",
    },
    {
      id: 3,
      alt: "Razer Gold Gift Card",
      url: "/products/razer.png",
      link: "/category/razer-gold",
    },
    {
      id: 4,
      alt: "PlayStation Gift Card",
      url: "/products/playstation.png",
      link: "/category/playstation",
    },
    {
      id: 5,
      alt: "Xbox Gift Card",
      url: "/products/xbox.png",
      link: "/category/xbox-gift-card",
    },
    {
      id: 8,
      alt: "Steam Gift Card",
      url: "/products/steam.png",
      link: "/category/steam-gift-card",
    },
    {
      id: 6,
      alt: "PubG Gift Card",
      url: "/products/pubg.png",
      link: "/category/pubg-gift-cards",
    },
    {
      id: 7,
      alt: "Amazon Gift Card",
      url: "/products/amazon.png",
      link: "/category/amazon-gift-cards",
    },
  ];
  return (
    <div className="container mx-auto pb-8">
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* Map through your products and display them here */}
        {products.map((product) => (
          <Link
            href={product.link || "#"}
            key={product.id}
            className="hover:scale-105 transition-transform"
          >
            <Image
              src={product.url}
              alt={product.alt}
              width={400}
              height={400}
              className="w-full h-auto object-fill rounded-lg"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
