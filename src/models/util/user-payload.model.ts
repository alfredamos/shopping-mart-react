import { Role } from "../auth/user-type.model";

export class UserPayload{
  id: string = "";
  name: string = "";
  role: Role = Role.Customer;
}