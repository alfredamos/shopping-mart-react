import { UserDto } from "../auth/user.model";

export class UserApiResults{
  message!: string;
  status!: string;
  users?: UserDto[];
  user?: UserDto;
}