export class ProductDto {
  id?: string;
  name!: string;
  price!: number;
  featured?: boolean;
  rating?: number;
  company!: string;
  description?: string;
  productImage?: string;
  userId?: string;
}
