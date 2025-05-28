export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: number;
  orderStatus: string;
  uniqueOrderId: string;
  orderItems: OrderItem[];
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
}
