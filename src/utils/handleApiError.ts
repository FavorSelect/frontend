import { toast } from "react-hot-toast";

export function handleApiError(
  err: unknown,
  fallbackMessage = "Something went wrong"
) {
  if (err instanceof Error) {
    toast.error(err.message || fallbackMessage);
  } else if (typeof err === "object" && err !== null && "data" in err) {
    const apiErr = err as { data?: { message?: string } };
    toast.error(apiErr?.data?.message || fallbackMessage);
  } else {
    toast.error(fallbackMessage);
  }

  console.error("API Error:", err);
}
