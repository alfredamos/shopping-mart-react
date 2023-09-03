import { Link } from "react-router-dom";
import OrderDto from "../../../models/orders/order.model";

interface Props {
  order: OrderDto;
}

export default function OrderDisplay({ order }: Props) {
  return (
    <>
      <td>{order.id}</td>
      <td>
        <Link
          to={`/orders/detail/${order?.id}`}
          className="btn btn-outline-primary m-1 btn-sm fw-bold"
        >
          View
        </Link>
        <Link
          to={`/orders/delete/${order?.id}`}
          className="btn btn-outline-danger m-1 btn-sm fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/orders/edit/${order?.id}`}
          className="btn btn-outline-secondary m-1 btn-sm fw-bold"
        >
          Edit
        </Link>        
      </td>
    </>
  );
}
