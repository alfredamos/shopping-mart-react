import { useNavigate, useParams } from "react-router-dom";
import CartItemDisplayOne from "../../components/displays/cartItems/CartItemDisplayOne";
import { cartItemActions } from "../../action-constants/cart-item.constant";
import { CartItemAction } from "../../actions/cartItem";
import { useReducer, Reducer, useEffect } from "react";
import { cartItemReducer } from "../../reducers/cartItem.reducer";
import { cartItemService } from "../../services/cartItem.service";
import { CartItemState } from "../../state/cartItem.state";

export function DetailCartItemPage() {
  const [cartItemState, cartItemDispatch] = useReducer<
    Reducer<CartItemState, CartItemAction>
  >(cartItemReducer, new CartItemState());

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    cartItemDispatch(new CartItemAction(cartItemActions.CART_ITEM_BEGIN, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cartItemService
      .getCartItemById(id!)
      .then((data) => {

        cartItemDispatch(
          new CartItemAction(
            cartItemActions.CART_ITEM_SUCCESS_CART_ITEM,
            data
          )
        );
      })
      .catch((error) => {
        cartItemDispatch(
          new CartItemAction(cartItemActions.CART_ITEM_FAILURE, error)
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const cartItemDeleteHandler = (value: boolean) => {
    if (value) {
      cartItemService
        .deleteCartItem(id!)
        .then(() => {
          navigate("/cartItems");
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <CartItemDisplayOne
      deleteHandler={cartItemDeleteHandler}
      cartItem={cartItemState.cartItem!}
      onBackToList={backToListHandler}
    />
  );
}
