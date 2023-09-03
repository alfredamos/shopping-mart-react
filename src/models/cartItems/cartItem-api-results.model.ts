import type CartItemDto from "./cartItem.model";

export class CartItemApiResults {
  status!: string;
  cartItems?: CartItemDto[];
  cartItem?: CartItemDto;
}
