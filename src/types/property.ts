export interface PropertyData {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  yearBuilt: string;
  price: string;
  tenantName?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  selected?: boolean;
}