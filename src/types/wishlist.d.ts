interface CustomerReviews {
  texts: string[];
  photos: string[];
}
interface WishlistProduct {
  id: number;
  sellerId: number;
  productName: string;
  productBrand: string;
  productCategoryId: number;
  productDescription: string;
  productPrice: number;
  coverImageUrl: string;
  inventoryStatus: string;
  isNewArrivalProduct: boolean;
  productDiscountPercentage: number | null;
  productDiscountPrice: number | null;
  productModelNumber: string | null;
  productReturnPolicy: string | null;
  productTags: string | null;
  productVideoUrl: string | null;
  productViewCount: number;
  productWarrantyInfo: string | null;
  productWeight: string | null;
  saleDayleft: number | null;
  saleEndDate: string | null;
  saleStartDate: string | null;
  stockKeepingUnit: string | null;
  averageCustomerRating: number;
  totalCustomerReviews: number;
  totalSoldCount: number;
  customerReviews: CustomerReviews;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  Product: WishlistProduct;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  success: boolean;
  wishlistCount: number;
  wishlist: WishlistItem[];
}
