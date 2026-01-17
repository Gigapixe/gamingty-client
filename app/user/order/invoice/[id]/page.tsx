import OrderInvoice from "@/components/dashboard/Order/OrderInvoice";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InvoicePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
     <OrderInvoice id={id}/>
    </div>
  );
}
