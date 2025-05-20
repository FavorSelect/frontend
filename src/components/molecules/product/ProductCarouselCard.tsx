import React from "react";

interface ProductCarouselCardProps {
  title: string;
  subtitle?: string;
  image: string;
  textColorClass?: string;
}

const ProductCarouselCard: React.FC<ProductCarouselCardProps> = ({
  title,
  subtitle,
  image,
  textColorClass = "#2E2C2C",
}) => {
  return (
    <div
      className="font-montserrat relative h-[280px] rounded-lg overflow-hidden flex-shrink-0 select-none"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute top-4 inset-0 flex flex-col items-center space-y-2 ${textColorClass}`}
      >
        <h3 className="text-xl font-light">{title}</h3>
        {subtitle && <p className="text-sm font-normal">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ProductCarouselCard;
