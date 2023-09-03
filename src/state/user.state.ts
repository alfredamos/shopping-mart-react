import { UserDto } from "../models/auth/user.model";
import { SignupDto } from '../models/auth/signup.model';

export class UserState{
  users?: UserDto[] = [];
  user?: UserDto = new UserDto();
  signup?: SignupDto = new SignupDto();
  isLoading: boolean = false;
  isDelete: boolean = false;
  errorMessage: string = "";

}