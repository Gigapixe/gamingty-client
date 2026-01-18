import { getCategoryBySlug } from "@/services/categoryService";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getCategoryBySlug(slug);

  console.log(data);
  return (
    <>
      <h1>Category: {slug}</h1>
    </>
  );
}
