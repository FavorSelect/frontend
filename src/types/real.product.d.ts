export interface Category {
  categoryName: string;
}

export interface Review {
  id: number;
  likeCount: number;
  productId: number;
  rating: number;
  reviewDate: string;
  reviewLike: number;
  reviewPhoto: string;
  reviewText: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };
}
export interface ProductT {
  id: number;
  UserId: number;
  availableStockQuantity: number;
  averageCustomerRating: number;
  category: Category;
  coverImageUrl: string;
  galleryImageUrls: string[];
  createdAt: string;
  customerReviews: string | null;
  inventoryStatus: "InStock" | "OutOfStock" | string;
  isNewArrivalProduct: boolean;
  productBestSaleTag?: string | null;
  productBrand: string;
  productCategoryId: number;
  productColors?: string;
  productDescription: string;
  productDimensions?: string | null;
  productDiscountPercentage: number;
  productDiscountPrice?: number | null;
  productMaterial?: string | null;
  productModelNumber?: string | null;
  productName: string;
  productPrice: number;
  productReturnPolicy?: string | null;
  productSizes: string;
  productTags: string;
  reviews: Review[];
  productVideoUrl: string;
  productViewCount: number;
  productWarrantyInfo?: string | null;
  productWeight?: string | null;
  rekognitionLabels: string[];
  saleDayleft?: number | null;
  saleEndDate?: string | null;
  saleStartDate?: string | null;
  seller?: string | null;
  sellerId?: number | null;
  status: "approved" | "pending" | "rejected" | string;
  stockKeepingUnit?: string | null;
  totalCustomerReviews: number;
  totalSoldCount: number;
  updatedAt: string;
}

export interface ProductApiResponse {
  success: boolean;
  products: ProductT[];
}
export interface ProductDetailsApiResponse {
  success: boolean;
  product: ProductT;
}

export interface SimilarProductsApiResponse {
  success: boolean;
  similarProducts: ProductT[];
}

export interface RecommendationApiResponse {
  success: boolean;
  recommended: ProductT[];
}

export interface ImageSearchProductApiResponse {
  success: boolean;
  matchedLabels: string[];
  products: ProductT[];
}

export interface SearchSuggestionsResponse {
  success: boolean;
  suggestions: string[];
}
