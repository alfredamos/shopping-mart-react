import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CategoryDto from "../../../models/categories/category.model";

interface Props {
  initialValue: CategoryDto; 
  onCategoryHandler: (categoryDto: CategoryDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  id: yup.string().optional(), 
  name: yup.string().required("Quantity is required!"),
});

export default function CategoryForm({
  initialValue, 
  onCategoryHandler,
  onBackToList,
}: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CategoryDto>({
    values: { ...initialValue },
    resolver: yupResolver(schema),
  });
  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: CategoryDto) => {
              onCategoryHandler({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Category Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="htmlForm-label">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  required
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.name?.message}
                </p>
              </div>              
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-outline-primary form-control fw-bold"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary form-control fw-bold"
                onClick={onBackToList}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
