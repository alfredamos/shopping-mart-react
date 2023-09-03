import { Reducer, useEffect, useReducer } from "react";
import { ProductAction } from "../../actions/product.action";
import { ProductState } from "../../state/product.state";
import { productReducer } from "../../reducers/product.reducer";
import ProductForm from "../../components/forms/products/ProductForm";
import { ProductDto } from "../../models/products/product.model";
import { useNavigate } from "react-router-dom";
import { UserAction } from "../../actions/user.action";
import { UserState } from "../../state/user.state";
import { userReducer } from "../../reducers/user.reducer";
import { userActions } from "../../action-constants/user.constant";
import { userService } from "../../services/user.service";
import { productActions } from "../../action-constants/product.constant";
import { productService } from "../../services/product.service";

export function ProductCreatePage() {
  const [, productDispatch] = useReducer<Reducer<ProductState, ProductAction>>(
    productReducer,
    new ProductState()
  );
  const [usersState, usersDispatch] = useReducer<
    Reducer<UserState, UserAction>
  >(userReducer, new UserState());

  const navigate = useNavigate();

  useEffect(() => {
    usersDispatch(new UserAction(userActions.USER_BEGIN, true));
  }, []);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((data) => {
        usersDispatch(
          new UserAction(userActions.USER_SUCCESS_USERS, data.users!)
        );
      })
      .catch((error) => {
        usersDispatch(new UserAction(userActions.USER_FAILURE, error));
      });
  }, []);

  const productSubmitHandler = (productDto: ProductDto) => {
    productDispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
    productService
      .createProduct(productDto)
      .then((data) => {
        console.log("new User : ", data);

        productDispatch(
          new ProductAction(
            productActions.PRODUCT_SUCCESS_PRODUCT,
            data
          )
        );
        navigate("/list-product");
      })
      .catch((error) => {
        productDispatch(
          new ProductAction(productActions.PRODUCT_FAILURE, error)
        );
      });
  };

  const backToList = () => {
    navigate("/list-product");
  };

  return (
    <ProductForm
      initialValue={new ProductDto()}
      users={usersState.users!}
      onBackToList={backToList}
      onProductHandler={productSubmitHandler}
    />
  );
}
