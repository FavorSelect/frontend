import { useSearchProductsByQueryMutation } from "@/store/api/searchApi";
import { useRouter } from "next/navigation";
import {
  setError,
  setLoading,
  setResults,
} from "@/store/slices/search-results/searchSlice";
import { AppDispatch } from "@/store/store";

export const handleTextSearch = async (
  suggestion: string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchProductsByQuery: ReturnType<typeof useSearchProductsByQueryMutation>[0],
  dispatch: AppDispatch,
  setSearchTerm: (value: string) => void,
  setShowSuggestions: (value: boolean) => void
) => {
  setSearchTerm(suggestion);
  setShowSuggestions(false);
  dispatch(setLoading(true));
  dispatch(setError(false));

  if (pathname !== "/search-results") {
    router.push("/search-results");
  }

  try {
    const response = await searchProductsByQuery(suggestion).unwrap();
    dispatch(
      setResults({
        products: response.products,
        labels: [],
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Text search error", error);
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  imageSearch: ReturnType<
    typeof import("@/store/api/searchApi").useImageSearchMutation
  >[0],
  dispatch: AppDispatch
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  dispatch(setLoading(true));
  dispatch(setError(false));

  if (pathname !== "/search-results") {
    router.push("/search-results");
  }

  try {
    const response = await imageSearch(formData).unwrap();
    dispatch(
      setResults({
        products: response.products,
        labels: response.matchedLabels,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
    console.error("RTK image search error", error);
  }
};
