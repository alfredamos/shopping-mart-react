import { productActions } from "../action-constants/product.constant";
import { ProductAction } from "../actions/product.action";
import { ProductState } from "../state/product.state";
import { ProductDto } from "../models/products/product.model";

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case productActions.PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: action.payload as boolean,
        errorMessage: "",
        products: [] as ProductDto[],
      };
    case productActions.PRODUCT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload as string,
        products: [] as ProductDto[],
      };
    case productActions.PRODUCT_SUCCESS_PRODUCT:
      return {
        ...state,
        product: action.payload as ProductDto,
        isLoading: false,
        errorMessage: "",
      };
    case productActions.PRODUCT_SUCCESS_PRODUCTS:
      return {
        ...state,
        products: action.payload as ProductDto[],
        isLoading: false,
        errorMessage: "",
      };
    default:
      return new ProductState();
  }
}
