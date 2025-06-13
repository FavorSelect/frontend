export interface Banner {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  success: boolean;
  message: string;
  banners: Banner[];
}
