import CategoriesCatalog from "@/components/homepage/CategoriesCatalog";
import CategorySliderUi from "@/components/homepage/CategorySilderUi";
import Features from "@/components/homepage/Features";
import HeroSection from "@/components/homepage/HeroSection/HeroSection";
import PopularProducts from "@/components/homepage/PopularProducts";
import ProductSection from "@/components/homepage/ProductSection";
import TrendingProducts from "@/components/homepage/TrendingProducts";
import CategorySliderSkeleton from "@/components/skeletons/CategorySliderSkeleton";
import { getAllBannersSSG } from "@/services/bannerService";
import {
  getCategoryParentsSSG,
  getShowingCatalogCategorysSSG,
} from "@/services/categoryService";
import Head from "next/head";
import { Suspense } from "react";

export default async function Home() {
  const data = await getAllBannersSSG();
  const res = await getCategoryParentsSSG();

  // Normalize the catalog response: use .data (not the ApiResponse object) and
  // convert any null icon values to undefined so they match the expected Category type.
  const categoriesCatalogRes = await getShowingCatalogCategorysSSG();
  const categoriesCatalogRaw = categoriesCatalogRes?.data ?? [];
  const categoriesCatalog = categoriesCatalogRaw.map((c: any) => ({
    ...c,
    icon: c.icon ?? undefined,
  }));

  const raw = res?.data || [];

  const values = raw.map((item: any) => ({
    id: item._id as string,
    name: item.name?.en || item.slug || "",
    slug: item.slug,
    image: item.icon ?? undefined,
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
      <div className="my-8">
        <Suspense fallback={<CategorySliderSkeleton />}>
          <CategorySliderUi values={values} />
        </Suspense>
      </div>
      <CategoriesCatalog values={categoriesCatalog} />
      <PopularProducts />
      <TrendingProducts />
    </div>
  );
}
