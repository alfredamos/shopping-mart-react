import { Reducer, useReducer, useEffect } from "react";
import { CategoryState } from "../../state/category.state";
import { categoryReducer } from "../../reducers/category.reducer";
import { Outlet } from "react-router-dom";
import { categoryService } from "../../services/category.service";
import { categoryActions } from "../../action-constants/category.constant";
import CategoryDto from "../../models/categories/category.model";
import { CategoryAction } from "../../actions/category.action";
import CategoriesTable from "../../components/displays/Categories/CategoriesTable";

export function ListCategoryPage() {
  const [state, dispatch] = useReducer<Reducer<CategoryState, CategoryAction>>(
    categoryReducer,
    new CategoryState()
  );

  useEffect(() => {
    dispatch(new CategoryAction(categoryActions.CATEGORY_BEGIN, true));
  }, []);

  useEffect(() => {
    const categories = JSON.parse(
      localStorage.getItem("categories")!
    ) as CategoryDto[];
    console.log("in useEffect, categories", categories);
    
    if (categories && categories.length > 0) {
      dispatch(
        new CategoryAction(
          categoryActions.CATEGORY_SUCCESS_CATEGORIES,
          categories
        )
      );
    } else {
      categoryService
        .getAllCategories()
        .then((data) => {
          console.log({data});
          
          categoryService.updateCategories$(data);
          dispatch(
            new CategoryAction(
              categoryActions.CATEGORY_SUCCESS_CATEGORIES,
              data
            )
          );
        })
        .catch((error) => {
          dispatch(
            new CategoryAction(categoryActions.CATEGORY_FAILURE, error)
          );
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          {
            
          !state.isLoading &&<CategoriesTable categories={state.categories!} />
          }
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
