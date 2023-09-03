import { Link } from "react-router-dom";
import UserDisplay from "./UserDisplay";
import { UserDto } from "../../../models/auth/user.model";

interface Props {
  users: UserDto[];
}

export default function UsersTable({ users }: Props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">User List</h4>
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
            {users?.map((user) => (
              <tr key={user.id}>
                <UserDisplay user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex flex-column align-items-center justify-content-center p-3">
        <Link
          to="/users/create"
          className="btn btn-outline-secondary btn-lg form-control fw-bold"
        >
          Create User
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
