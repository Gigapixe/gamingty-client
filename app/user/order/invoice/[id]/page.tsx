import OrderInvoice from "@/components/dashboard/Order/OrderInvoice";

export type paramsType = Promise<{ id: string }>;
type Props = {
    params: paramsType;
  };

export default async function InvoicePage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
     <OrderInvoice id={id}/>
    </div>
  );
}
