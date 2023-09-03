import { categoryActions } from "../action-constants/category.constant";
import { CategoryAction } from "../actions/category.action";
import CategoryDto from "../models/categories/category.model";
import { CategoryState } from "../state/category.state";

export function categoryReducer(
  state: CategoryState,
  action: CategoryAction
): CategoryState {
  console.log("In reducer ", {category: state.categories});
  
  switch (action.type) {
    case categoryActions.CATEGORY_BEGIN:
      return {
        ...state,
        isLoading: action.payload as boolean,
        errorMessage: "",
        categories: [] as CategoryDto[],
      };
    case categoryActions.CATEGORY_FAILURE:
      return {
        ...state,
        errorMessage: action.payload as string,
        categories: [] as CategoryDto[],
      };
    case categoryActions.CATEGORY_SUCCESS_CATEGORY:
      return {
        ...state,
        category: action.payload as CategoryDto,
        isLoading: false,
        errorMessage: "",
      };
    case categoryActions.CATEGORY_SUCCESS_CATEGORIES:
      return {
        ...state,
        categories: action.payload as CategoryDto[],
        isLoading: false,
        errorMessage: "",
      };
    default:
      return new CategoryState();
  }
}
