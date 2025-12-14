import DynamicPages from "@/components/pages/DynamicPages";
import { getPageBySlug } from "@/services/pageService";

export default async function FooterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let pageData = null;
  try {
    const pageResponse = await getPageBySlug(slug);
    if (pageResponse) {
      pageData = pageResponse?.data || null;
    } else return null;
  } catch (error) {
    // console.error("Error fetching page data:", error);
    pageData = null;
  }

  return (
    <>
      <DynamicPages pageDetails={pageData} />
    </>
  );
}
