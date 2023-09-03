import { Gender } from "./gender.model";

export class EditProfileDto {
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";  
  gender: Gender = Gender.Male;
}