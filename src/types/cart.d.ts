export interface CartProduct {
  id: number;
  UserId: number;
  sellerId: number | null;
  productName: string;
  productDescription: string | null;
  productCategoryId: number;
  productBrand: string;
  productTags: string;
  productColors: string | null;
  productSizes: string | null;
  productMaterial: string | null;
  productModelNumber: string | null;
  productPrice: number;
  productDiscountPrice: number | null;
  productDiscountPercentage: number | null;
  productReturnPolicy: string | null;
  productWarrantyInfo: string | null;
  productDimensions: string | null;
  productWeight: string | null;
  productVideoUrl: string | null;
  coverImageUrl: string;
  availableStockQuantity: number;
  inventoryStatus: string;
  isNewArrivalProduct: boolean;
  productBestSaleTag: string | null;
  saleStartDate: string | null;
  saleEndDate: string | null;
  saleDayleft: number | null;
  productViewCount: number;
  averageCustomerRating: number;
  totalCustomerReviews: number;
  totalSoldCount: number;
  customerReviews: string;
  rekognitionLabels: string[];
  status: string;
  stockKeepingUnit: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  totalPrice: number;
  orderId: number | null;
  createdAt: string;
  updatedAt: string;
  Product: CartProduct;
}

export interface Cart {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  CartItems: CartItem[];
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
}

export interface GetCartSummaryResponse {
  cart: Cart;
  summary: CartSummary;
}
