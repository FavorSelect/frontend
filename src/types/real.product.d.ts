export interface Category {
  categoryName: string;
}

export interface ProductT {
  id: number;
  UserId: number;
  availableStockQuantity: number;
  averageCustomerRating: number;
  category: Category;
  coverImageUrl: string;
  createdAt: string;
  customerReviews: string | null;
  inventoryStatus: "InStock" | "OutOfStock" | string;
  isNewArrivalProduct: boolean;
  productBestSaleTag?: string | null;
  productBrand: string;
  productCategoryId: number;
  productColors?: string[] | null;
  productDescription: string;
  productDimensions?: string | null;
  productDiscountPercentage?: number | null;
  productDiscountPrice?: number | null;
  productMaterial?: string | null;
  productModelNumber?: string | null;
  productName: string;
  productPrice: number;
  productReturnPolicy?: string | null;
  productSizes?: string[] | null;
  productTags: string;
  productVideoUrl?: string | null;
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

export interface RecommendationApiResponse {
  success: boolean;
  recommended: ProductT[];
}
