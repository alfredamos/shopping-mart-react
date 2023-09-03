import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProductDto } from "../../../models/products/product.model";
import { UserDto } from "../../../models/auth/user.model";

interface Props {
  initialValue: ProductDto;
  users: UserDto[];
  onProductHandler: (productDto: ProductDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required("Name is required!"),
  company: yup.string().required("Company is required!"),
  description: yup.string().optional(),
  productImage: yup.string().optional(),
  featured: yup.boolean().optional(),
  userId: yup.string().optional(),
  price: yup.number().required("Price is required!"),
  rating: yup.number().optional(),
});

const ProductForm = ({ onProductHandler, onBackToList, initialValue, users }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProductDto>({
    values: { ...initialValue },
    resolver: yupResolver<ProductDto>(schema),
  });

  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: ProductDto) => {
              onProductHandler({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Product Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.name?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  {...register("company")}
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.company?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Image
                </label>
                <input
                  {...register("productImage")}
                  type="text"
                  className="form-control"
                />                
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  {...register("description")}                  
                  className="form-control"
                />               
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  {...register("price")}
                  type="number"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.price?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  User
                </label>
                <select {...register("userId")} className="form-select">
                  <option>Please select the user</option>
                  {users.map((user) => (
                    <option id={user.id} value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </select>                
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
};

export default ProductForm