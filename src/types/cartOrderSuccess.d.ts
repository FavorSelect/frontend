export interface CartOrder {
  id: number;
  uniqueOrderId: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "Stripe" | "PayPal" | "COD" | string;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  totalAmount: number;
  userId: number;
  addressId: number;
  cartId: number;
  appliedCouponId: number | null;
  orderDate: string;
}
export interface CartOrderSuccessResponse {
  message: string;
  uniqueOrderId: string;
  order: CartOrder;
}
