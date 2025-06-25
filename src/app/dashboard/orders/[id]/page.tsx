import OrderDetails from "@/components/molecules/dashboard/OrderDetails";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  return <OrderDetails id={id} />;
}
