export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  minimumStockQuantity: number;
  unit: string;
  storeId: string;
}

export type Product = ProductProps;
