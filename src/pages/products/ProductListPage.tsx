import { useReducer, Reducer, useEffect } from "react";
import { ProductState } from "../../state/product.state";
import { ProductAction } from "../../actions/product.action";
import { productReducer } from "../../reducers/product.reducer";
import { productActions } from "../../action-constants/product.constant";
import { productService } from "../../services/product.service";
import ProductDisplay from "../../components/displays/products/ProductDisplay";
import { Link, useNavigate } from "react-router-dom";
import { ProductDto } from "../../models/products/product.model";
import { useObservable } from "../../hooks/useObservable";
import { authService } from "../../services/auth.service";
import { AuthApiResponse } from "../../models/auth/api-response.model";
import { Role } from "../../models/auth/user-type.model";

export function ProductListPage() {
  const [{ products }, dispatch] = useReducer<
    Reducer<ProductState, ProductAction>
  >(productReducer, new ProductState());

  const navigate = useNavigate();

  const authUser = useObservable(authService.authUser$, new AuthApiResponse());
  const isAdmin = authUser.role === Role.Admin;

  useEffect(() => {
    dispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
  }, []);

  useEffect(function () {
    const products = JSON.parse(
      localStorage.getItem("products")!
    ) as ProductDto[];

    if (products && products.length) {
      console.log("In useEffect at point 1, products : ", products);
      dispatch(
        new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCTS, products!)
      );
    } else {
      productService.getAllProducts().then((products) => {
        dispatch(
          new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCTS, products!)
        );
      });
    }
  }, []);

  const backToList = () => {
    navigate("/");
  };

  const addToCart = (id: string) => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <div className="container">
      {isAdmin && (
        <div className="row mt-5">
          <div className="col-6">
            <h4 className="d-flex justify-content-start align-content-center">
              Create new Product &#8594;
            </h4>
          </div>
          <div className="col-6 d-flex justify-content-end align-content-center">
            <Link
              to="/list-product/create"
              className="btn btn-outline-secondary btn-lg w-50 me-0 fw-bold"
            >
              Create
            </Link>
          </div>
        </div>
      )}

      <div className="row mt-5">
        {products?.map((product) => (
          <div className="col col-sm-2 col-md-3 col-lg-4 m-1" key={product.id}>
            <ProductDisplay
              product={product}
              onBackToList={backToList}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
