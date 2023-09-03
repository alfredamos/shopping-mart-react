import { Fragment } from "react";
import OrderDto from "../../../models/orders/order.model";
import { AlertModal } from "../../../util/AlertModal";

interface Props {
  order: OrderDto;
  onBackToList: () => void;
  deleteHandler: (value: boolean) => void;
}

export default function OrderDisplayOne({
  order,
  onBackToList,
  deleteHandler,
}: Props) {
  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">Order Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Order Id : {order?.id}</li>
            <li className="list-group-item">Buyer : {order?.user?.name}</li>
            <li className="list-group-item">Total : {order?.total}</li>
            <li className="list-group-item">Items : {order?.items}</li>
            <li className="list-group-item">
              <ul className="list-group">
                {order?.cartItems?.map((cartItem) => (
                  <Fragment key={cartItem.id}>
                    <li className="list-group-item mt-2">
                      cartItem Id : {cartItem?.id}
                    </li>
                    <li className="list-group-item">
                      Product : {cartItem?.product?.name}
                    </li>
                    <li className="list-group-item">
                      Price : {cartItem?.price}
                    </li>
                    <li className="list-group-item">
                      Quantity : {cartItem?.quantity}
                    </li>
                    <hr/>
                  </Fragment>
                ))}
              </ul>
            </li>
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
        modalMessage="Do you really want to delete this order?"
        modalTitle="Order Delete Confirmation!"
        modalButtonSave="Delete"
        modalButtonHandler={deleteHandler}
      />
    </div>
  );
}
