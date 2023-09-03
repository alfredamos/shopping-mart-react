import OrderDto  from "../orders/order.model";
import {ProductDto} from "../products/product.model";

export default class CartItemDto {
  id?: string = "";
  orderId?: string = "";
  productId: string = "";
  price: number = 0;
  quantity: number = 0;
  order?: OrderDto = new OrderDto();
  product?: ProductDto = new ProductDto();
}
