import OrderDto from "../models/orders/order.model";

type Payload = boolean | string | OrderDto[] | OrderDto;

export class OrderAction {
  constructor(public type: string, public payload: Payload) {}
}
