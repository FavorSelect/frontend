import WishListWrapper from "@/components/organisms/dashboard/WishListWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <WishListWrapper token={token} />;
}
