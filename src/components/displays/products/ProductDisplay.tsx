import { ProductDto } from "../../../models/products/product.model";

interface Props {
  product: ProductDto;
  onBackToList: () => void;
  addToCart: (id: string) => void;
}

export default function ProductDisplay({ addToCart, product }: Props) {
  return (
    <div className="card shadow-lg bg-white">
      <div className="card-header bg-primary">
        <h4 className="text-center text-white">{product.name}</h4>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group item">
            <p>{product.company}</p>
          </li>
          <li className="list-group item">
            <p>{product.price}</p>
          </li>
          <li className="list-group item">
            <p>{product.rating}</p>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <button
        type="button"
          onClick={() => addToCart(product.id!)}
          className="btn btn-outline-secondary form-control shadow-sm fw-bold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
