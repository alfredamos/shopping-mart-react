import { Link } from "react-router-dom";
import OrderDisplay from "./OrderDisplay";
import OrderDto from "../../../models/orders/order.model";

interface Props {
  orders: OrderDto[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Order List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Order Id</th>             
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <OrderDisplay order={order} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex flex-column align-items-center justify-content-center p-3">
        <Link
          to="/orders/create"
          className="btn btn-outline-secondary btn-lg form-control fw-bold"
        >
          Create Order
        </Link>
        <Link
          to="/admin-panel"
          className="btn btn-outline-primary btn-lg form-control fw-bold"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
