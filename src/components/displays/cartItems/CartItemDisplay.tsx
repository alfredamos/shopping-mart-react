import { Link } from "react-router-dom";
import CartItemDto from "../../../models/cartItems/cartItem.model";

interface Props {
  cartItem: CartItemDto;
}

export default function CartItemDisplay({ cartItem }: Props) {
  return (
    <>
      <td>{cartItem?.product?.name}</td>
      <td>{cartItem?.price}</td>
      <td>{cartItem?.quantity}</td>
      <td>
        <Link
          to={`/cart-items/detail/${cartItem?.id}`}
          className="btn btn-outline-primary m-1 btn-sm fw-bold"
        >
          View
        </Link>
        <Link
          to={`/cart-items/delete/${cartItem?.id}`}
          className="btn btn-outline-danger m-1 btn-sm fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/cart-items/edit/${cartItem?.id}`}
          className="btn btn-outline-secondary m-1 btn-sm fw-bold"
        >
          Edit
        </Link>        
      </td>
    </>
  );
}
