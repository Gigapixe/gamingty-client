import Features from "@/components/homepage/Features";
import HeroSection from "@/components/homepage/HeroSection/HeroSection";
import ProductSection from "@/components/homepage/ProductSection";
import { getAllBanners } from "@/services/bannerService";
import Head from "next/head";

export default async function Home() {
  const data = await getAllBanners();
  return (
    <div>
      <Head>
        <title>Gamingty - Home</title>
        <meta
          name="description"
          content="Buy Digital Goods At Unbeatable Price Instantly - Trusted & Secure"
        />
      </Head>
      <HeroSection banners={data} />
      <ProductSection />
      <Features />
    </div>
  );
}
