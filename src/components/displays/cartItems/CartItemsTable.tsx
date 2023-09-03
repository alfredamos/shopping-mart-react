import { Link } from "react-router-dom";
import CartItemDisplay from "./CartItemDisplay";
import CartItemDto from "../../../models/cartItems/cartItem.model";

interface Props {
  cartItems: CartItemDto[];
}

export default function CartItemsTable({ cartItems }: Props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">CartItem List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Product</th>
              <th className="fw-bold">Price</th>
              <th className="fw-bold">Quantity</th>
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((cartItem) => (
              <tr key={cartItem.id}>
                <CartItemDisplay cartItem={cartItem} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex flex-column align-items-center justify-content-center p-3">
        <Link
          to="/cart-items/create"
          className="btn btn-outline-secondary btn-lg form-control fw-bold"
        >
          Create CartItem
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
