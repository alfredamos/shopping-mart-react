import {UserDto} from '../auth/user.model';
import type CartItemDto from '../cartItems/cartItem.model';
import { Status } from '../enums/status.enum';

export default class OrderDto{
  id?: string = "";
  items?: number = 0;
  total?: number = 0;
  userId?: string = "";
  user?: UserDto = new UserDto();
  status: Status = Status.Pending;
  cartItems?: CartItemDto[] = [];
}