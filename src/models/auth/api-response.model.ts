import { Role } from "./user-type.model";

export class AuthApiResponse{
  message: string = "";
  token: string = "";
  isLoggedIn: boolean = false;
  role?: Role = Role.Customer;
}