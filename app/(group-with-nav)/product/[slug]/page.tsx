import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // No product API set up yet — render the segment-scoped not-found page
  return notFound();
}
