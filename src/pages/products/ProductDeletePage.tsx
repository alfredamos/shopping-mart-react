import { useReducer, Reducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../action-constants/product.constant";
import { ProductAction } from "../../actions/product.action";
import { ProductDisplayOne } from "../../components/displays/products/ProductDisplayOne";
import { productReducer } from "../../reducers/product.reducer";
import { productService } from "../../services/product.service";
import { ProductState } from "../../state/product.state";

export function ProductDeletePage() {
  const [productState, productDispatch] = useReducer<
    Reducer<ProductState, ProductAction>
  >(productReducer, new ProductState());

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    productDispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
  }, []);

  useEffect(() => {
    productService
      .getProductById(id!)
      .then((data) => {
        console.log("data: ", data);

        productDispatch(
          new ProductAction(
            productActions.PRODUCT_SUCCESS_PRODUCT,
            data.product!
          )
        );
      })
      .catch((error) => {
        productDispatch(
          new ProductAction(productActions.PRODUCT_FAILURE, error)
        );
      });
  }, [id, navigate]);

  const deleteProductHandler = (value: boolean) => {
    if (value) {
      productService
        .deleteProduct(id!)
        .then(({ data }) => {
          productDispatch(
            new ProductAction(
              productActions.PRODUCT_SUCCESS_PRODUCT,
              data.product!
            )
          );
          navigate("/list-product");
        })
        .catch((error) => {
          productDispatch(
            new ProductAction(productActions.PRODUCT_FAILURE, error)
          );
        });
    } else {
      navigate("/list-product");
    }
  };

  const backToListHandler = () => {
    navigate("/list-product");
  };

  return (
    <div className="row">
      <div className="col col-sm-6 col-md-6 offset-3 mt-5">
        <ProductDisplayOne
          deleteHandler={deleteProductHandler}
          onBackToList={backToListHandler}
          product={productState.product!}
        />
      </div>
    </div>
  );
}
