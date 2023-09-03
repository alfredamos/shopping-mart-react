import { useReducer, Reducer, useEffect } from "react";
import { ProductState } from "../../state/product.state";
import { ProductAction } from "../../actions/product.action";
import { productReducer } from "../../reducers/product.reducer";
import { ProductDisplayOne } from "../../components/displays/products/ProductDisplayOne";
import { productActions } from "../../action-constants/product.constant";
import { productService } from "../../services/product.service";
import { useNavigate, useParams } from "react-router-dom";

export function ProductDetailPage() {
  const [productState, productDispatch] = useReducer<
    Reducer<ProductState, ProductAction>
  >(productReducer, new ProductState());

  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Product-detail : ", id);

  useEffect(() => {
    productDispatch(new ProductAction(productActions.PRODUCT_BEGIN, true));
  }, []);

  useEffect(() => {
    productService
      .getProductById(id!)
      .then((data) => {
        console.log("data: ", data);

        productDispatch(
          new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCT, data)
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
            new ProductAction(productActions.PRODUCT_SUCCESS_PRODUCT, data)
          );
          navigate("/products");
        })
        .catch((error) => {
          productDispatch(
            new ProductAction(productActions.PRODUCT_FAILURE, error)
          );
        });
    } else {
      navigate("/products");
    }
  };

  const backToListHandler = () => {
    navigate("/products");
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
