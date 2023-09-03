import CartItemDto from "../models/cartItems/cartItem.model";

type Payload = boolean | string | CartItemDto[] | CartItemDto;

export class CartItemAction {
  constructor(public type: string, public payload: Payload) {}
}
