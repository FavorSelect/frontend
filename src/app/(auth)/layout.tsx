import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="min-h-auto px-0 py-0 flex flex-col items-center justify-center bg-gray-50">
          {children}
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
}
