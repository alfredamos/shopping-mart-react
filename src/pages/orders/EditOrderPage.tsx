import { Reducer, useEffect, useReducer } from "react";
import { OrderState } from "../../state/order.state";
import { orderReducer } from "../../reducers/order.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../../services/order.service";
import OrderDto from "../../models/orders/order.model";
import OrderForm from "../../components/forms/orders/OrderForm";
import { UserAction } from "../../actions/user.action";
import { userActions } from "../../action-constants/user.constant";
import { userService } from "../../services/user.service";
import { userReducer } from "../../reducers/user.reducer";
import { UserState } from "../../state/user.state";
import { orderActions } from "../../action-constants/order.constant";
import { OrderAction } from "../../actions/order.action";

export function EditOrderPage() {
  const [stateOrder, dispatchOrder] = useReducer<
    Reducer<OrderState, OrderAction>
  >(orderReducer, new OrderState());

  const [usersState, dispatchUsers] = useReducer<
    Reducer<UserState, UserAction>
  >(userReducer, new UserState());

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    userService.getAllUsers().then((data) => {
      dispatchUsers(new UserAction(userActions.USER_SUCCESS_USER, data.users!));
    });
  }, []);

  
  useEffect(() => {
    orderService.getOrderById(id!)
      .then(data => {
        dispatchOrder(new OrderAction(orderActions.ORDER_SUCCESS_ORDER, data))

      }).catch(error => console.log(error))
  });

  useEffect(() => {
    dispatchOrder(new OrderAction(orderActions.ORDER_BEGIN, true));
  }, []);

  const orderHandler = (orderDto: OrderDto) => {
    orderService
      .createOrder(orderDto)
      .then(({ data }) => {
        dispatchOrder(
          new OrderAction(orderActions.ORDER_SUCCESS_ORDER, data)
        );
        navigate("/orders");
      })
      .catch((error) => {
        dispatchOrder(new OrderAction(orderActions.ORDER_FAILURE, error));
      });
  };

  const backToListHandler = () => {
    navigate("/orders");
  };

  return (
    <OrderForm
      users={usersState.users!}
      initialValue={stateOrder.order}
      onOrderHandler={orderHandler}
      onBackToList={backToListHandler}
    />
  );
}
