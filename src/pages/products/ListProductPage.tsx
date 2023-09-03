import { Reducer, useEffect, useReducer } from "react";
import { ProductState } from "../../state/product.state";
import { ProductAction } from "../../actions/product.action";
import { productReducer } from "../../reducers/product.reducer";
import { Outlet } from "react-router-dom";
import { productService } from "../../services/product.service";
import ProductsTable from "../../components/displays/products/ProductsTable";
import { productActions } from "../../action-constants/product.constant";
import { ProductDto } from "../../models/products/product.model";

export function ListProductPage() {
  const [state, dispatch] = useReducer<Reducer<ProductState, ProductAction>>(
    productReducer,
    new ProductState()
  );

  useEffect(() => {
    dispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const products = JSON.parse(
      localStorage.getItem("products")!
    ) as ProductDto[];
    if (products && products.length > 0) {
      dispatch(
        new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCTS, products)
      );
    } else {
      productService
        .getAllProducts()
        .then((data) => {
          productService.updateProducts$(data);
          dispatch(
            new ProductAction(
              productActions.PRODUCT_SUCCESS_PRODUCTS,
              data
            )
          );
        })
        .catch((error) => {
          dispatch(new ProductAction(productActions.PRODUCT_FAILURE, error));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <ProductsTable products={state.products!} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
