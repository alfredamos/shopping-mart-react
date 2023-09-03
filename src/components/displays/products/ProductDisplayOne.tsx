import { ProductDto } from "../../../models/products/product.model";
import { AlertModal } from "../../../util/AlertModal";

interface Props {
  product: ProductDto;
  onBackToList: () => void;
  deleteHandler: (value: boolean) => void;
}

export function ProductDisplayOne({ deleteHandler, onBackToList, product }: Props) {
  console.log("Product : ", product)
  
  return (
    <div className="col col-sm-6-offset-3">
      <div className="card">
        <div className="card-header bg-primary text-white p-2">
          <h4 className="text-center">Product Detail</h4>
        </div>
        <div className="card-body">
          <img src={product?.productImage} className="img-fluid"/>
          <ul className="list-group">
            <li className="list-group-item">Name : {product.name} </li>
            <li className="list-group-item">Company: {product.company}</li>
            <li className="list-group-item">Price: {product.price} </li>
            <li className="list-group-item">
              Description: {product.description}
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
        modalMessage="Do you really want to delete this user?"
        modalTitle="User Delete Confirmation!"
        modalButtonSave="Delete"
        modalButtonHandler={deleteHandler}
      />
    </div>
  );
}
