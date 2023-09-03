import Axios from "../interceptors/axios.interceptor";
import { BehaviorSubject } from "rxjs";
import OrderDto from "../models/orders/order.model";
//import { AuthApiResponse } from "../models/auth/api-response.model";

export class OrderService {
  private ordersSubject = new BehaviorSubject<OrderDto[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(public url: string) {
    const orders = this.getOrdersFromLocalStorage();
    if (orders && orders.length > 0) this.onLoad();
  }

  async createOrder(orderDto: OrderDto) {
    const data  = Axios.post<OrderDto>(`${this.url}`, orderDto);

    return data;
  }

  onLoad() {
    console.log("In onload!!!");
    this.getAllOrders()
      .then((data) => {
        this.updateOrders$(data);
        console.log({ orders: data });
        localStorage.setItem("orders", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  }

  async editOrder(orderDto: OrderDto) {
    const {data} = await Axios.patch<OrderDto>(
      `${this.url}/${orderDto.id}`,
      orderDto
    );

    return data;
  }

  async deleteOrder(id: string) {
    const {data} = await Axios.delete<OrderDto>(`${this.url}/${id}`);
  
    return data;
  }

  async getAllOrders() {
    const { data } = await Axios.get<OrderDto[]>(this.url);

    return data;
  }

  async getOrderById(id: string) {
    const { data } = await Axios.get<OrderDto>(`${this.url}/${id}`);
    return data;
  }

  private getOrdersFromLocalStorage(): OrderDto[] {
    const orders = JSON.parse(localStorage.getItem("orders")!);
    return orders;
  }

  updateOrders$(value: OrderDto[]) {
    this.ordersSubject.next(value);
  }

  updateWithOneOrder$(value: OrderDto) {
    const allOrders = this.getOrders();
    const newAllOrders = [...allOrders, value];
    this.ordersSubject.next(newAllOrders);
  }

  getOrders(): OrderDto[] {
    return this.ordersSubject.getValue();
  }
}

const orderUrl = "/orders";

export const orderService = new OrderService(orderUrl);
