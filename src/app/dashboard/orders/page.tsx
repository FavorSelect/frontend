import OrdersWrapper from "@/components/organisms/dashboard/OrdersWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <OrdersWrapper token={token} />;
}
