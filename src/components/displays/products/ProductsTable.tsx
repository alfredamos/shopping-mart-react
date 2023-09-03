import { Link } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";
import { ProductDto } from "../../../models/products/product.model";

interface Props {
  products: ProductDto[];
}

export default function ProductsTable({ products }: Props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Product List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Name</th>
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <DisplayProduct product={product} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex flex-column align-items-center justify-content-center p-3">
        <Link
          to="/list-product/create"
          className="btn btn-outline-secondary btn-lg form-control fw-bold"
        >
          Create Product
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
