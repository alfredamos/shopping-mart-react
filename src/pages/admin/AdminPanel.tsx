import { Link } from "react-router-dom";

export function AdminPanel() {
  return (
    <div className="row mt-5">
      <div className="col col-sm-6 offset-3">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <h1 className="text-primary">Admin Panel</h1>
            <table className="table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  <th className="fw-bolder">Cart Items</th>
                  <th className="fw-bolder">Categories</th>
                  <th className="fw-bolder">Orders</th>
                  <th className="fw-bolder">Products</th>
                  <th className="fw-bolder">Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link className="link-primary fw-bold" to="/cart-items">
                      List Cart Items &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/categories">
                      List Categories &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/orders">
                      List Orders &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/list-product">
                      List Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/users">
                      List User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/orders/create"
                    >
                      Create Cart Item &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/orders/create"
                    >
                      Create Category &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/orders/create"
                    >
                      Create Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/list-product/create"
                    >
                      Create Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-secondary fw-bold" to="/users/create">
                      Create User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-success fw-bold" to="/list-product">
                      View Cart Item &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/list-product">
                      View Category &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/list-product">
                      View Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/list-product">
                      View Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/users">
                      View User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-product">
                      Update Cart Item &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-product">
                      Update Category &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-product">
                      Update Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-product">
                      Update Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/users">
                      Update User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-product">
                      Delete Cart Item &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-product">
                      Delete Category &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-product">
                      Delete Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-product">
                      Delete Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/users">
                      Delete User &#10146;
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-transparent text-dark d-flex justify-content-center align-content-center border-top-0">
            <Link
              className="btn btn-outline-secondary btn-lg w-90 fw-bold"
              to="/users"
            >
              Change User Role
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
