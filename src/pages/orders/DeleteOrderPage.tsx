import { useReducer, Reducer, useEffect } from "react";
import { OrderState } from "../../state/order.state";
import { OrderAction } from "../../actions/order.action";
import { orderReducer } from "../../reducers/order.reducer";
import { orderActions } from "../../action-constants/order.constant";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../../services/order.service";
import OrderDisplayOne from "../../components/displays/orders/OrderDisplayOne";

export function DeleteOrderPage() {
  const [orderState, orderDispatch] = useReducer<
    Reducer<OrderState, OrderAction>
  >(orderReducer, new OrderState());

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    orderDispatch(new OrderAction(orderActions.ORDER_BEGIN, true));
  }, []);

  useEffect(() => {
    orderService
      .getOrderById(id!)
      .then((data) => {
        console.log("data: ", data);

        orderDispatch(
          new OrderAction(orderActions.ORDER_SUCCESS_ORDER, data)
        );
      })
      .catch((error) => {
        orderDispatch(
          new OrderAction(orderActions.ORDER_FAILURE, error)
        );
      });
  }, [id, navigate]);

  const deleteOrderHandler = (value: boolean) => {
    if (value) {
      orderService
        .deleteOrder(id!)
        .then(( data ) => {
          orderDispatch(
            new OrderAction(orderActions.ORDER_SUCCESS_ORDER, data)
          );
          navigate("/orders");
        })
        .catch((error) => {
          orderDispatch(
            new OrderAction(orderActions.ORDER_FAILURE, error)
          );
        });
    } else {
      navigate("/orders");
    }
  };

  const backToListHandler = () => {
    navigate("/orders");
  };

  return (
    <div className="row">
      <div className="col col-sm-6 col-md-6 offset-3 mt-5">
        <OrderDisplayOne
          deleteHandler={deleteOrderHandler}
          onBackToList={backToListHandler}
          order={orderState.order!}
        />
      </div>
    </div>
  );
}
