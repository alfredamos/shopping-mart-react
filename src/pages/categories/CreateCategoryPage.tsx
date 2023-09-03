import { Reducer, useReducer } from "react";
import { CategoryAction } from "../../actions/category.action";
import { CategoryState } from "../../state/category.state";
import { categoryReducer } from "../../reducers/category.reducer";
import { useNavigate } from "react-router-dom";
import { categoryActions } from "../../action-constants/category.constant";
import CategoryForm from "../../components/forms/categories/CategoryForm";
import CategoryDto from "../../models/categories/category.model";
import { categoryService } from "../../services/category.service";

export function CreateCategoryPage() {
  const [, categoryDispatch] = useReducer<
    Reducer<CategoryState, CategoryAction>
  >(categoryReducer, new CategoryState());

  const navigate = useNavigate();

  const categorySubmitHandler = (categoryDto: CategoryDto) => {
    categoryDispatch(new CategoryAction(categoryActions.CATEGORY_BEGIN, true));
    categoryService
      .createCategory(categoryDto)
      .then((data) => {
        console.log("new User : ", data);
        categoryDispatch(
          new CategoryAction(categoryActions.CATEGORY_SUCCESS_CATEGORY, data)
        );
        navigate("/categories");
      })
      .catch((error) => {
        categoryDispatch(
          new CategoryAction(categoryActions.CATEGORY_FAILURE, error)
        );
      });
  };

  const backToList = () => {
    navigate("/categories");
  };

  return (
    <CategoryForm
      initialValue={new CategoryDto()}
      onBackToList={backToList}
      onCategoryHandler={categorySubmitHandler}
    />
  );
}
