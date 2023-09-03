import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OrderDto  from "../../../models/orders/order.model";
import { UserDto } from "../../../models/auth/user.model";
import { Status } from "../../../models/enums/status.enum";

interface Props {
  initialValue: OrderDto;
  users: UserDto[];
  onOrderHandler: (orderDto: OrderDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  id: yup.string().optional(),
  userId: yup.string().optional(),
  status: yup
    .mixed<Status>()
    .oneOf(Object.values(Status))
    .required("Status is required!"),
});

const OrderForm = ({
  onOrderHandler,
  onBackToList,
  initialValue,
  users,
}: Props) => {
  const {
    handleSubmit,
    register,
    reset,
  } = useForm<OrderDto>({
    values: { ...initialValue },
    resolver: yupResolver(schema),
  });

  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: OrderDto) => {
              onOrderHandler({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Order Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  User
                </label>
                <select {...register("userId")} className="form-select">
                  <option>Please select the user</option>
                  {users.map((user) => (
                    <option id={user.id} value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select {...register("status")} className="form-select">
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Returned">Returned</option>
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

export default OrderForm;
