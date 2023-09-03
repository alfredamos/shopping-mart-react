import { Link } from "react-router-dom";
import { UserDto } from "../../../models/auth/user.model";

interface Props {
  user: UserDto;
}

export default function UserDisplay({ user }: Props) {
  return (
    <>
      <td>{user.name}</td>
      <td>
        <Link
          to={`/users/detail/${user?.id}`}
          className="btn btn-outline-primary m-1 btn-sm fw-bold"
        >
          View
        </Link>
        <Link
          to={`/users/delete/${user?.id}`}
          className="btn btn-outline-danger m-1 btn-sm fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/users/edit/${user?.id}`}
          className="btn btn-outline-secondary m-1 btn-sm fw-bold"
        >
          Edit
        </Link>
        <Link
          to={`/users/make-admin/${user?.id}`}
          className="btn btn-outline-dark m-1 btn-sm fw-bold"
        >
          Role
        </Link>
      </td>
    </>
  );
}
