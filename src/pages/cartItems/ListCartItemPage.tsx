/* eslint-disable react-hooks/exhaustive-deps */
import { Reducer, useReducer, useEffect } from "react";
import { CartItemState } from "../../state/cartItem.state";
import { cartItemReducer } from "../../reducers/cartItem.reducer";
import { Outlet } from "react-router-dom";
import CartItemsTable from "../../components/displays/cartItems/CartItemsTable";
import { cartItemService } from "../../services/cartItem.service";
import { cartItemActions } from "../../action-constants/cart-item.constant";
import { CartItemAction } from "../../actions/cartItem";
import CartItemDto from "../../models/cartItems/cartItem.model";

export function ListCartItemPage() {
  const [state, dispatch] = useReducer<Reducer<CartItemState, CartItemAction>>(
    cartItemReducer,
    new CartItemState()
  );

  useEffect(() => {
    dispatch(new CartItemAction(cartItemActions.CART_ITEM_BEGIN, true));
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")!) as CartItemDto[];
    if (cartItems && cartItems.length > 0) {
      dispatch(new CartItemAction(cartItemActions.CART_ITEM_SUCCESS_CART_ITEMS, cartItems));
    } else {
      cartItemService
        .getAllCartItems()
        .then((data) => {
          cartItemService.updateCartItems$(data);
          dispatch(new CartItemAction(cartItemActions.CART_ITEM_SUCCESS_CART_ITEMS, data));
        })
        .catch((error) => {
          dispatch(new CartItemAction(cartItemActions.CART_ITEM_FAILURE, error));
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <CartItemsTable cartItems={state.cartItems!} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
