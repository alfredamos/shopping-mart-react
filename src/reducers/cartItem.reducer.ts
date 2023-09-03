import { cartItemActions } from "../action-constants/cart-item.constant";
import { CartItemAction } from "../actions/cartItem";
import CartItemDto from "../models/cartItems/cartItem.model";
import { CartItemState } from "../state/cartItem.state";

export function cartItemReducer(state: CartItemState, action: CartItemAction): CartItemState {
  switch (action.type) {
    case cartItemActions.CART_ITEM_BEGIN:
      return {
        ...state,
        cartItems: [],
        isLoading: action.payload as boolean,
        errorMessage: "",
      };
    case cartItemActions.CART_ITEM_FAILURE:
      return {
        ...state,
        cartItems: [],
        isLoading: false,
        errorMessage: action.payload as string,
      };
    case cartItemActions.CART_ITEM_SUCCESS_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload as CartItemDto[],
        isLoading: false,
        errorMessage: "",
      };
    case cartItemActions.CART_ITEM_SUCCESS_CART_ITEM:
      return {
        ...state,
        cartItem: action.payload as CartItemDto,
        isLoading: false,
        errorMessage: "",
      };
    default:
      return new CartItemState();
  }
}
