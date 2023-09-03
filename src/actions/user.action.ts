import { UserDto } from "../models/auth/user.model";

type Payload = boolean | string | UserDto[] | UserDto;

export class UserAction{
  constructor(public type: string, public payload: Payload){}
}