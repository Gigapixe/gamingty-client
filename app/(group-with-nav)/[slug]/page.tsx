import DynamicPages from "@/components/pages/DynamicPages";
import { getPageBySlugSSG, getAllPagesSSG } from "@/services/pageService";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const pagesResponse = await getAllPagesSSG();
    const pages = pagesResponse?.data || [];

    return pages.map((page: any) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function FooterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let pageData = null;
  try {
    const pageResponse = await getPageBySlugSSG(slug);
    if (pageResponse) {
      pageData = pageResponse?.data || null;
    } else return null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    notFound();
  }

  return (
    <>
      <DynamicPages pageDetails={pageData} />
    </>
  );
}
