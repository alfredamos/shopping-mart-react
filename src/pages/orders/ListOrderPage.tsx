/* eslint-disable react-hooks/exhaustive-deps */
import { Reducer, useReducer, useEffect } from "react";
import { OrderState } from "../../state/order.state";
import { orderReducer } from "../../reducers/order.reducer";
import { Outlet } from "react-router-dom";
import OrdersTable from "../../components/displays/orders/OrdersTable";
import { orderService } from "../../services/order.service";
import OrderDto from "../../models/orders/order.model";
import { orderActions } from "../../action-constants/order.constant";
import { OrderAction } from "../../actions/order.action";

export function ListOrderPage() {
  const [state, dispatch] = useReducer<Reducer<OrderState, OrderAction>>(
    orderReducer,
    new OrderState()
  );

  useEffect(() => {
    dispatch(new OrderAction(orderActions.ORDER_BEGIN, true));
  }, []);

  useEffect(() => {
    const orders = JSON.parse(
      localStorage.getItem("orders")!
    ) as OrderDto[];
    if (orders && orders.length > 0) {
      dispatch(
        new OrderAction(
          orderActions.ORDER_SUCCESS_ORDERS,
          orders
        )
      );
    } else {
      orderService
        .getAllOrders()
        .then((data) => {
          orderService.updateOrders$(data);
          dispatch(
            new OrderAction(
              orderActions.ORDER_SUCCESS_ORDERS,
              data
            )
          );
        })
        .catch((error) => {
          dispatch(
            new OrderAction(orderActions.ORDER_FAILURE, error)
          );
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <OrdersTable orders={state.orders!} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
