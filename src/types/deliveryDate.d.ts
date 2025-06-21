export interface DeliverDate {
  eta: string;
  distance: string;
  deliveryDate: string;
}
export interface DeliveryDateApiResponse {
  success: boolean;
  estimate: DeliverDate;
  source: string;
}
