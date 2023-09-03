import Axios from "../interceptors/axios.interceptor";
import { BehaviorSubject } from "rxjs";
import CartItemDto from "../models/cartItems/cartItem.model";
//import { AuthApiResponse } from "../models/auth/api-response.model";

export class CartItemService {
  private cartItemsSubject = new BehaviorSubject<CartItemDto[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(public url: string) {
    const cartItems = this.getCartItemsFromLocalStorage();
    if (cartItems && cartItems.length > 0) this.onLoad();
  }

  async createCartItem(cartItemDto: CartItemDto) {
    const {data} = await Axios.post<CartItemDto>(`${this.url}`, cartItemDto);
    return data;
  }

  onLoad() {
    console.log("In onload!!!");
    this.getAllCartItems()
      .then((data) => {
        this.updateCartItems$(data);
        console.log({ cartItems: data });
        localStorage.setItem("cartItems", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  }

  async editCartItem(cartItemDto: CartItemDto) {
    const {data} = await Axios.patch<CartItemDto>(
      `${this.url}/${cartItemDto.id}`,
      cartItemDto
    );

    return data;
  }

  async deleteCartItem(id: string) {
    const {data} = await Axios.delete<CartItemDto>(`${this.url}/${id}`);
  
    return data;
  }

  async getAllCartItems() {
    const { data } = await Axios.get<CartItemDto[]>(this.url);

    return data;
  }

  async getCartItemById(id: string) {
    const { data } = await Axios.get<CartItemDto>(`${this.url}/${id}`);
    return data;
  }

  private getCartItemsFromLocalStorage(): CartItemDto[] {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")!);
    return cartItems;
  }

  updateCartItems$(value: CartItemDto[]) {
    this.cartItemsSubject.next(value);
  }

  updateWithOneCartItem$(value: CartItemDto) {
    const allCartItems = this.getCartItems();
    const newAllCartItems = [...allCartItems, value];
    this.cartItemsSubject.next(newAllCartItems);
  }

  getCartItems(): CartItemDto[] {
    return this.cartItemsSubject.getValue();
  }
}

const cartItemUrl = "/cart-items";

export const cartItemService = new CartItemService(cartItemUrl);
