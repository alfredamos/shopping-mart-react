import CartItemDto from "../../../models/cartItems/cartItem.model";
import { AlertModal } from "../../../util/AlertModal";

interface Props {
  cartItem: CartItemDto;
  onBackToList: () => void;
  deleteHandler: (value: boolean) => void;
}

export default function CartItemDisplayOne({ cartItem, onBackToList,deleteHandler }: Props) {
  return (
    <div className="col-sm-8 offset-2 mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">CartItem Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Product : {cartItem?.product?.name}</li>
            <li className="list-group-item">Price : {cartItem?.price}</li>
            <li className="list-group-item">Quantity : {cartItem?.quantity}</li>
          </ul>
        </div>
        <div className="card-footer">
          <button
          type="button"
            onClick={onBackToList}
            className="btn-outline-secondary form-control text-center m-1 fw-bold"
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-danger form-control fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete
          </button>
        </div>
      </div>
      <AlertModal
        modalButtonClose="back"
        modalMessage="Do you really want to delete this cartItem?"
        modalTitle="CartItem Delete Confirmation!"
        modalButtonSave="Delete"
        modalButtonHandler={deleteHandler}
      />
    </div>
  );
}
