import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";
import productImage from "@/assets/images/yacht-dress-suit-pleasing-luxury.png";
import productImage2 from "@/assets/images/yacht-dress-suit-pleasing-luxury-2.png";
import productImage3 from "@/assets/images/yacht-dress-suit-pleasing-luxury-3.png";
import trendingBanner from "@/assets/images/trending-banner.png";
import Image from "next/image";

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

const PopularProductGrid = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">The populars</Heading>
            <Link href="#" className="flex items-center">
              All Products <ChevronRight />
            </Link>
          </div>

          <div className="flex gap-x-3">
            <div>
              <Image
                src={trendingBanner}
                alt="Trending-banner"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div
              className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6
           "
            >
              {dummyProducts.map((product, index) => (
                <ProductDisplayCard key={index} {...product} />
              ))}
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default PopularProductGrid;
