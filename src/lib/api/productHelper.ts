"use server";
import { handleError } from "@/utils/handleResponseError";
type ResponseKeys = "products" | "recommended" | "similarProducts";

export async function safeProductFetch<T>(
  endpoint: string,
  key: ResponseKeys,
  includeCreds = false
): Promise<T[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      ...(includeCreds && { credentials: "include" }),
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const data = await response.json();
    return data[key] ?? [];
  } catch (error) {
    console.warn(`⚠️ Failed to fetch ${key} from ${endpoint}:`, error);
    return [];
  }
}
