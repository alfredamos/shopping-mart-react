import OrderDto from "../models/orders/order.model";

export class OrderState {
  order: OrderDto = new OrderDto();
  orders: OrderDto[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";
}
