import CartItemDto from "../models/cartItems/cartItem.model";

export class CartItemState {
  cartItem: CartItemDto = new CartItemDto();
  cartItems: CartItemDto[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";
}
