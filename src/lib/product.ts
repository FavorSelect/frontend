const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type RawProduct = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
};

export type Product = {
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  badges: string[];
  isWishlisted: boolean;
};

export function transformProduct(product: RawProduct): Product {
  return {
    id: product.id,
    imageSrc: product.thumbnail,
    title: product.title,
    price: product.price,
    originalPrice: product.price + 20,
    discount: `${product.discountPercentage.toFixed(0)}%`,
    rating: product.rating,
    badges: ["Best Seller", "top performer"],
    isWishlisted: false,
  };
}

export async function fetchCosyEveningProducts(limit = 5): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=${limit}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.products.map(transformProduct);
}

export async function fetchPopularProducts(limit = 5): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popular products");
  }

  const data = await res.json();
  return data.products.map(transformProduct);
}

export async function fetchTopPickProducts(limit = 5): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch top pick products");
  }

  const data = await res.json();
  return data.products.map(transformProduct);
}

export async function fetchSimilarProducts(limit = 5): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popular products");
  }

  const data = await res.json();
  return data.products.map(transformProduct);
}
