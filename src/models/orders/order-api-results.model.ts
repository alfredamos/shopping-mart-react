import type OrderDto from "./order.model";

export class OrderApiResults {
  status!: string;
  orders?: OrderDto[];
  order?: OrderDto;
}
