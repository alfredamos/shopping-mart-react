import { useReducer, Reducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../action-constants/product.constant";
import { userActions } from "../../action-constants/user.constant";
import { ProductAction } from "../../actions/product.action";
import { UserAction } from "../../actions/user.action";
import ProductForm from "../../components/forms/products/ProductForm";
import { ProductDto } from "../../models/products/product.model";
import { productReducer } from "../../reducers/product.reducer";
import { userReducer } from "../../reducers/user.reducer";
import { productService } from "../../services/product.service";
import { userService } from "../../services/user.service";
import { ProductState } from "../../state/product.state";
import { UserState } from "../../state/user.state";

export function ProductEditPage() {
  const [productState, productDispatch] = useReducer<
    Reducer<ProductState, ProductAction>
  >(productReducer, new ProductState());
  const [usersState, usersDispatch] = useReducer<
    Reducer<UserState, UserAction>
  >(userReducer, new UserState());

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    productService.getProductById(id!).then((product) => {
      productDispatch(
        new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCT, product!)
      );
    });
  }, [id]);

  const productSubmitHandler = (productDto: ProductDto) => {
    productDispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
    productService
      .editProduct(productDto)
      .then((product) => {
        console.log("new User : ", product);

        productDispatch(
          new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCT, product!)
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
      initialValue={productState.product}
      users={usersState.users!}
      onBackToList={backToList}
      onProductHandler={productSubmitHandler}
    />
  );
}
