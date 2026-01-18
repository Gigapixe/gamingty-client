import { getCategoryBySlug } from "@/services/categoryService";
import { notFound } from "next/navigation";
import CategoryPageComponent from "@/components/pages/category/CategoryPage";
import type { Category } from "@/types/category";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getCategoryBySlug(slug);
  const data: Category[] = res?.data || [];

  // optional: return notFound if no categories found
  // if (!data || data.length === 0) notFound();

  return (
    <>
      <CategoryPageComponent categories={data} slug={slug} />
    </>
  );
}
