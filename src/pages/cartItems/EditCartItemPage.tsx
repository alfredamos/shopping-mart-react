/* eslint-disable react-hooks/exhaustive-deps */
import { Reducer, useEffect, useReducer, useState } from "react";
import { CartItemState } from "../../state/cartItem.state";
import { cartItemReducer } from "../../reducers/cartItem.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { cartItemService } from "../../services/cartItem.service";
import { cartItemActions } from "../../action-constants/cart-item.constant";
import { CartItemAction } from "../../actions/cartItem";
import CartItemDto from "../../models/cartItems/cartItem.model";
import CartItemForm from "../../components/forms/cartItems/CartItemForm";
import { productService } from "../../services/product.service";
import { ProductDto } from "../../models/products/product.model";

export function EditCartItemPage() {
  const [stateCartItem, dispatchCartItem] = useReducer<
    Reducer<CartItemState, CartItemAction>
  >(cartItemReducer, new CartItemState());

  const [products, setProducts] = useState([] as ProductDto[]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    productService
      .getAllProducts()
      .then((products) => {
        console.log({ products });
        setProducts(products);       
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    cartItemService
      .getCartItemById(id!)
      .then((data) => {
        dispatchCartItem(
          new CartItemAction(cartItemActions.CART_ITEM_SUCCESS_CART_ITEM, data)
        );
      })
      .catch((error) => {
        dispatchCartItem(
          new CartItemAction(cartItemActions.CART_ITEM_FAILURE, error)
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const cartItemHandler = (cartItemDto: CartItemDto) => {
    cartItemService
      .editCartItem(cartItemDto)
      .then((data) => {
        console.log("cartItem-in-cartItem-edit : ", data);
        dispatchCartItem(
          new CartItemAction(cartItemActions.CART_ITEM_SUCCESS_CART_ITEM, data)
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
      products={products}
      initialValue={stateCartItem.cartItem}
      onCartItemHandler={cartItemHandler}
      onBackToList={backToListHandler}
    />
  );
}
