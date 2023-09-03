import { Link } from "react-router-dom";
import CategoryDto from "../../../models/categories/category.model";

interface Props {
  category: CategoryDto;
}

export default function CategoryDisplay({ category }: Props) {
  console.log({category});
  
  return (
    <>
      <td>{category.name}</td>
      <td>
        <Link
          to={`/categories/detail/${category?.id}`}
          className="btn btn-outline-primary m-1 btn-sm fw-bold"
        >
          View
        </Link>
        <Link
          to={`/categories/delete/${category?.id}`}
          className="btn btn-outline-danger m-1 btn-sm fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/categories/edit/${category?.id}`}
          className="btn btn-outline-secondary m-1 btn-sm fw-bold"
        >
          Edit
        </Link>        
      </td>
    </>
  );
}
