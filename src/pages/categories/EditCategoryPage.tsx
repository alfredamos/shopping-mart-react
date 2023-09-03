import { Reducer, useEffect, useReducer } from "react";
import { CategoryState } from "../../state/category.state";
import { CategoryAction } from "../../actions/category.action";
import { categoryReducer } from "../../reducers/category.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { categoryActions } from "../../action-constants/category.constant";
import { categoryService } from "../../services/category.service";
import CategoryDto from "../../models/categories/category.model";
import CategoryForm from "../../components/forms/categories/CategoryForm";

export function EditCategoryPage() {
  const [state, dispatch] = useReducer<Reducer<CategoryState, CategoryAction>>(
    categoryReducer,
    new CategoryState()
  );

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(new CategoryAction(categoryActions.CATEGORY_BEGIN, true));
  }, []);

  useEffect(() => {
    categoryService
      .getCategoryById(id!)
      .then((data) => {
        
        dispatch(new CategoryAction(categoryActions.CATEGORY_SUCCESS_CATEGORY, data));
      })
      .catch((error) => {
        dispatch(new CategoryAction(categoryActions.CATEGORY_FAILURE, error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const categoryEditHandler = (categoryDto: CategoryDto) => {
    categoryService
      .editCategory(categoryDto)
      .then(( data ) => {
        console.log("category-in-category-edit : ", data);

        dispatch(new CategoryAction(categoryActions.CATEGORY_SUCCESS_CATEGORY, data));
        navigate("/categories");
      })
      .catch((error) => {
        dispatch(new CategoryAction(categoryActions.CATEGORY_FAILURE, error));
      });
  };

  const backToListHandler = () => {
    navigate("/categories");
  };

  return (
    <CategoryForm
      initialValue={state?.category}
      onCategoryHandler={categoryEditHandler}
      onBackToList={backToListHandler}
    />
  );
}
