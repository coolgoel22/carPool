export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  pin?: string;
  gender?: string;
  address?: {
    locality?: string,
    pincode?: string,
    city?: string,
    state?: string
  }

}