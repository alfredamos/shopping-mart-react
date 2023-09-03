import CategoryDto from "../models/categories/category.model";

export class CategoryState {
  category: CategoryDto = new CategoryDto();
  categories: CategoryDto[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";
}
