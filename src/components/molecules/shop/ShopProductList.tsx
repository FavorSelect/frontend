import { Product } from "@/types/Product";
import ProductDisplayCard from "../product/ProductDisplayCard";
import { getProductGridClasses } from "@/utils/getProductGridClasses";

const ShopProductList = ({
  products,
  viewMode,
}: {
  products: Product[];
  viewMode: "grid" | "list";
}) => (
  <div className={getProductGridClasses(viewMode)}>
    {products.map((product, index) => (
      <ProductDisplayCard
        key={`${product.id}-${index}`}
        {...product}
        viewMode={viewMode}
      />
    ))}
  </div>
);
export default ShopProductList;
