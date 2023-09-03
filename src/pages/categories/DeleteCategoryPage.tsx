import { Reducer, useReducer, useEffect } from "react";
import { CategoryState } from "../../state/category.state";
import { categoryReducer } from "../../reducers/category.reducer";
import { categoryService } from "../../services/category.service";
import { useNavigate, useParams } from "react-router-dom";
import { categoryActions } from "../../action-constants/category.constant";
import { CategoryAction } from "../../actions/category.action";
import CategoryDisplayOne from "../../components/displays/Categories/CategoryDisplayOne";

export function DeleteCategoryPage() {
  const [categoryState, categoryDispatch] = useReducer<
    Reducer<CategoryState, CategoryAction>
  >(categoryReducer, new CategoryState());

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    categoryDispatch(new CategoryAction(categoryActions.CATEGORY_BEGIN, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    categoryService
      .getCategoryById(id!)
      .then((data) => {
        console.log("category-in-category-detail : ", data);

        categoryDispatch(
          new CategoryAction(
            categoryActions.CATEGORY_SUCCESS_CATEGORY,
            data
          )
        );
      })
      .catch((error) => {
        categoryDispatch(
          new CategoryAction(categoryActions.CATEGORY_FAILURE, error)
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const categoryDeleteHandler = (value: boolean) => {
    if (value) {
      categoryService
        .deleteCategory(id!)
        .then(() => {
          navigate("/categories");
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <CategoryDisplayOne
      deleteHandler={categoryDeleteHandler}
      category={categoryState.category!}
      onBackToList={backToListHandler}
    />
  );
}
