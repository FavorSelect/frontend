import ReviewForm from "@/components/molecules/dashboard/ReviewForm";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <ReviewForm productId={id} token={token} />;
}
