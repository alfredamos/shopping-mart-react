import { ProductDto } from "../models/products/product.model";
export class ProductState {
  product: ProductDto = new ProductDto();
  products: ProductDto[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";
}
