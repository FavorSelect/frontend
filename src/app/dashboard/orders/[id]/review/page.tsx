import UserReviewWrapper from "@/components/organisms/dashboard/UserReviewWrapper";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  return <UserReviewWrapper id={id} />;
}
