import Heading from "@/components/atoms/Heading";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";
import { Product } from "@/types/Product";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CosyProductListProps = {
  products: Product[];
};

const CosyEveningsProductGrid = ({ products }: CosyProductListProps) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">For cosy evenings</Heading>
            <Link href="#" className="flex items-center">
              All Products <ChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product, index) => (
              <ProductDisplayCard key={index} {...product} />
            ))}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CosyEveningsProductGrid;
