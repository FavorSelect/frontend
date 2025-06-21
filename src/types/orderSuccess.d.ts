export interface Order {
  id: number;
  userId: number;
  uniqueOrderId: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderDate: string;
  totalAmount: number;
  addressId: number;
  cartId: number | null;
  appliedCouponId: number | null;
  paymentStatus: "Completed" | "Pending" | "Failed";
  paymentMethod: "Stripe" | "COD" | "Razorpay" | string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSuccessResponse {
  message: string;
  orderId: string;
  order: Order;
  orderItem: OrderItem;
}
