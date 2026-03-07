export interface ProductProps {
  id: string;
  name: string;
  roast: 'light' | 'medium' | 'dark';
  priceInCents: number;
  stockQuantity: number;
  minimumStockQuantity: number;
  unit: string;
  storeId: string;
}

export type Product = ProductProps;
