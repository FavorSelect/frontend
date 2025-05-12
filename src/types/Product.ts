export interface Review {
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  tags: string[];
  brand: string;
  images: string[];
  reviews: Review[];
}
