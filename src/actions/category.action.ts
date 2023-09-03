import CategoryDto from "../models/categories/category.model";

type Payload = boolean | string | CategoryDto[] | CategoryDto;

export class CategoryAction {
  constructor(public type: string, public payload: Payload) {}
}
