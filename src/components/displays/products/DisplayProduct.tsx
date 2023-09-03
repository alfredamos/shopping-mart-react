import { Link } from "react-router-dom";
import { ProductDto } from "../../../models/products/product.model";

interface Props {
  product: ProductDto;
}

export default function DisplayProduct({ product }: Props) {
  return (
    <>
      <td>{product.name}</td>
      <td>
        <Link
          to={`/list-product/detail/${product?.id}`}
          className="btn btn-outline-primary m-1 btn-sm fw-bold"
        >
          View
        </Link>
        <Link
          to={`/list-product/delete/${product?.id}`}
          className="btn btn-outline-danger m-1 btn-sm fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/list-product/edit/${product?.id}`}
          className="btn btn-outline-secondary m-1 btn-sm fw-bold"
        >
          Edit
        </Link>
        <Link
          to={`/list-product/feature/${product?.id}`}
          className="btn btn-outline-dark m-1 btn-sm fw-bold"
        >
          Feature
        </Link>
      </td>
    </>
  );
}
