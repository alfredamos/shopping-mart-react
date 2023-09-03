import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CartItemDto from "../../../models/cartItems/cartItem.model";
import { ProductDto } from "../../../models/products/product.model";

interface Props {
  initialValue: CartItemDto;
  products: ProductDto[];
  onCartItemHandler: (cartItemDto: CartItemDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  id: yup.string().optional(),  
  productId: yup.string().required(),
  price: yup.number().required("Price is required!"),
  quantity: yup.number().required("Quantity is required!"),
  
});

export default function CartItemForm({
  initialValue,
  products,
  onCartItemHandler,
  onBackToList,
}: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CartItemDto>({
    values: { ...initialValue },
    resolver: yupResolver(schema),
  });
  
  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: CartItemDto) => {
              onCartItemHandler({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">CartItem Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="price" className="htmlForm-label">
                  Price
                </label>
                <input
                  id="price"
                  {...register("price")}
                  required
                  type="number"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.price?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="htmlForm-label">
                  Quantity
                </label>
                <input
                  id="quantity"
                  {...register("quantity")}
                  required
                  type="number"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.quantity?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  Product
                </label>
                <select
                  {...register("productId")}
                  id="productId"
                  className="form-select"
                >
                  <option>Please select product</option>
                  {products?.map((product) => (
                    <option value={product.id} id={product.id}>
                      {product.name}
                    </option>
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
}
