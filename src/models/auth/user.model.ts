import { Gender } from "./gender.model";
import { Role } from "./user-type.model";

export class UserDto {
  id?: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  confirmPassword?: string = "";
  role?: Role;
  gender: Gender = Gender.Male;
}
