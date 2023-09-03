import { orderActions } from "../action-constants/order.constant";
import { OrderAction } from "../actions/order.action";
import OrderDto from "../models/orders/order.model";
import { OrderState } from "../state/order.state";

export function orderReducer(
  state: OrderState,
  action: OrderAction
): OrderState {
  switch (action.type) {
    case orderActions.ORDER_BEGIN:
      return {
        ...state,
        isLoading: action.payload as boolean,
        errorMessage: "",
        orders: [] as OrderDto[],
      };
    case orderActions.ORDER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload as string,
        orders: [] as OrderDto[],
      };
    case orderActions.ORDER_SUCCESS_ORDER:
      return {
        ...state,
        order: action.payload as OrderDto,
        isLoading: false,
        errorMessage: "",
      };
    case orderActions.ORDER_SUCCESS_ORDERS:
      return {
        ...state,
        orders: action.payload as OrderDto[],
        isLoading: false,
        errorMessage: "",
      };
    default:
      return new OrderState();
  }
}
