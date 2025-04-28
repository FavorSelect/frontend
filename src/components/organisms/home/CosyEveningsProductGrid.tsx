import productImage from "@/assets/images/yacht-dress-suit-pleasing-luxury.png";
import productImage2 from "@/assets/images/yacht-dress-suit-pleasing-luxury-2.png";
import productImage3 from "@/assets/images/yacht-dress-suit-pleasing-luxury-3.png";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";

const dummyProducts = [
  {
    imageSrc: productImage.src,
    title: "Leather Mens Slipper",
    price: 239.44,
    originalPrice: 225.66,
    discount: "10%",
    rating: 4.5,
    badges: ["Sale 11 days", "Best Seller"],
    isWishlisted: true,
  },
  {
    imageSrc: productImage2.src,
    title: "Leather Mens Slipper",
    price: 239.44,
    originalPrice: 225.66,

    rating: 4.5,
    badges: ["Sale 11 days", "Best Seller"],
    isWishlisted: false,
  },
  {
    imageSrc: productImage.src,
    title: "Leather Mens Slipper",
    price: 239.44,
    originalPrice: 225.66,
    discount: "10%",
    rating: 4.5,
    badges: ["Sale 11 days", "Best Seller"],
    isWishlisted: true,
  },
  {
    imageSrc: productImage3.src,
    title: "Leather Mens Slipper",
    price: 239.44,
    originalPrice: 225.66,
    discount: "10%",
    rating: 4.5,
    badges: ["Sale 11 days", "Best Seller"],
    isWishlisted: true,
  },
  {
    imageSrc: productImage.src,
    title: "Leather Mens Slipper",
    price: 239.44,
    originalPrice: 225.66,

    rating: 4.5,
    badges: ["Sale 11 days", "Best Seller"],
    isWishlisted: true,
  },
];

const CosyEveningsProductGrid = () => {
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
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3
           "
          >
            {dummyProducts.map((product, index) => (
              <ProductDisplayCard key={index} {...product} />
            ))}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CosyEveningsProductGrid;
