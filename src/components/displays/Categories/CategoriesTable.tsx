import { Link } from "react-router-dom";
import CategoryDisplay from "./CategoryDisplay";
import CategoryDto from "../../../models/categories/category.model";

interface Props {
  categories: CategoryDto[];
}

export default function CategoriesTable({ categories }: Props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Category List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bcategoryed">
          <thead>
            <tr>
              <th className="fw-bold">Name</th>             
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id}>
                <CategoryDisplay category={category} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex flex-column align-items-center justify-content-center p-3">
        <Link
          to="/categories/create"
          className="btn btn-outline-secondary btn-lg form-control fw-bold"
        >
          Create Category
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
