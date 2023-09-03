import { UserInfo } from "../models/auth/user-info.model";
import { Role } from "../models/auth/user-type.model";

export const initialUser: UserInfo = {
  id: "",
  name: "",
  role: Role.Customer,
  token: "",
};
