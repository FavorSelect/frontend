import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Product } from "@/types/Product";

type UseInfiniteProductsProps = {
  initialProducts: Product[];
  fetcher: (offset: number, limit: number) => Promise<Product[]>;
  limit: number;
};

export const useInfiniteProducts = ({
  initialProducts,
  fetcher,
  limit = 20,
}: UseInfiniteProductsProps) => {
  const [offset, setOffset] = useState(limit);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    if (!hasMoreData) return;

    try {
      const newProducts = await fetcher(offset, limit);

      if (!newProducts.length) {
        setHasMoreData(false);
        return;
      }

      setProducts((prev) => [...prev, ...newProducts]);
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  }, [fetcher, offset, limit, hasMoreData]);

  useEffect(() => {
    if (inView && hasMoreData) {
      loadMore();
    }
  }, [inView, hasMoreData, loadMore]);

  return {
    products,
    hasMoreData,
    scrollRef: ref,
  };
};
