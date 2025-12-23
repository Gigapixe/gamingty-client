import CategorySliderUi from "@/components/homepage/CategorySilderUi";
import Features from "@/components/homepage/Features";
import HeroSection from "@/components/homepage/HeroSection/HeroSection";
import PopularProducts from "@/components/homepage/PopularProducts";
import ProductSection from "@/components/homepage/ProductSection";
import TrendingProducts from "@/components/homepage/TrendingProducts";
import CategorySliderSkeleton from "@/components/skeletons/CategorySliderSkeleton";
import { getAllBannersSSG } from "@/services/bannerService";
import { getCategoryParentsSSG } from "@/services/categoryService";
import Head from "next/head";
import { Suspense } from "react";

export default async function Home() {
  const data = await getAllBannersSSG();
  const res = await getCategoryParentsSSG();
  const raw = res?.data || [];

  const values = raw.map((item: any) => ({
    id: item._id as string,
    name: item.name?.en || item.slug || "",
    slug: item.slug,
    image: item.icon ?? null,
  }));
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
      <div className="mt-8">
        <Suspense fallback={<CategorySliderSkeleton />}>
          <CategorySliderUi values={values} />
        </Suspense>
      </div>
      <PopularProducts />
      <TrendingProducts />
    </div>
  );
}
