import { Reducer, useEffect, useReducer } from "react";
import { CartItemState } from "../../state/cartItem.state";
import { cartItemReducer } from "../../reducers/cartItem.reducer";
import { useNavigate } from "react-router-dom";
import { cartItemService } from "../../services/cartItem.service";
import { cartItemActions } from "../../action-constants/cart-item.constant";
import { CartItemAction } from "../../actions/cartItem";
import CartItemDto from "../../models/cartItems/cartItem.model";
import CartItemForm from "../../components/forms/cartItems/CartItemForm";
import { ProductAction } from "../../actions/product.action";
import { productActions } from "../../action-constants/product.constant";
import { productService } from "../../services/product.service";
import { productReducer } from "../../reducers/product.reducer";
import { ProductState } from "../../state/product.state";

export function CreateCartItemPage() {
  const [stateCartItem, dispatchCartItem] = useReducer<
    Reducer<CartItemState, CartItemAction>
  >(cartItemReducer, new CartItemState());

  const [productsState, dispatchProducts] = useReducer<
    Reducer<ProductState, ProductAction>
  >(productReducer, new ProductState());

  const navigate = useNavigate();

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      dispatchProducts(
        new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCT, products)
      );
    });
  }, []);

  useEffect(() => {
    dispatchCartItem(new CartItemAction(cartItemActions.CART_ITEM_BEGIN, true));
  }, []);

  const cartItemHandler = (cartItemDto: CartItemDto) => {
    cartItemService
      .createCartItem(cartItemDto)
      .then((data ) => {
        console.log("cartItem-in-cartItem-edit : ", data);
        dispatchCartItem(
          new CartItemAction(
            cartItemActions.CART_ITEM_SUCCESS_CART_ITEM,
            data
          )
        );
        navigate("/cart-items");
      })
      .catch((error) => {
        dispatchCartItem(
          new CartItemAction(cartItemActions.CART_ITEM_FAILURE, error)
        );
      });
  };

  const backToListHandler = () => {
    navigate("/cart-items");
  };

  return (
    <CartItemForm
      products={productsState?.products}
      initialValue={stateCartItem.cartItem}
      onCartItemHandler={cartItemHandler}
      onBackToList={backToListHandler}
    />
  );
}
