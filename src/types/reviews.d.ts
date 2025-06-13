interface ReviewdProduct {
  id: number;
  productName: string;
  coverImageUrl: string;
  productPrice: number;
}

interface Review {
  id: number;
  userId: number;
  productId: number;
  reviewText: string;
  reviewPhoto: string | null;
  rating: number;
  reviewDate: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  product: ReviewdProduct;
}

export interface ReviewsResponse {
  success: boolean;
  totalReviews: number;
  reviews: Review[];
}
