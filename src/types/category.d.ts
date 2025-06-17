export interface Subcategory {
  id: number;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryProductCount: number;
  subcategories: Subcategory[];
}

export interface CategoryResponse {
  categories: Category[];
}
