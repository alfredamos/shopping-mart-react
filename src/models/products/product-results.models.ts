import { ProductDto } from './product.model';
export class ProductApiResults{
  status!: string;
  products?: ProductDto[];
  product?: ProductDto;
}