export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  type: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AddressApiResponse {
  success: boolean;
  message: string;
  addresses: Address[];
}

export interface AddressDeleteResponse {
  success: boolean;
  message: string;
}
