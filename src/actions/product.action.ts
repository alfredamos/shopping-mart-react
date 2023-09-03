import { ProductState } from "../state/product.state";
import { ProductDto } from "../models/products/product.model";

export const initialProductListState = new ProductState();

type Payload = boolean | string | ProductDto[] | ProductDto;

export class ProductAction {
  constructor(public type: string, public payload: Payload) {}
}
