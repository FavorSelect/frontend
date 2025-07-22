"use server";
import { ProductT } from "@/types/real.product";
import { handleError } from "@/utils/handleResponseError";

export async function getProductDetails(id: string): Promise<ProductT | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/general/products/${id}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const data = await response.json();
    return data.product as ProductT;
  } catch (error) {
    console.warn(`⚠️ Failed to fetch product details for ID: ${id}`, error);
    return null;
  }
}
