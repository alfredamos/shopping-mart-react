import { Link } from "react-router-dom";

export const SomethingWrongPage = () => {
  return (
    <div className="row mt-5">
      <div className="col col-sm-6 offset-3">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <p className="lead text-primary">
              Oops something went wrong, please login again!
            </p>
          </div>
          <div className="d-flex align-content-center justify-content-between p-5">
            <Link className="link-primary" to="/login">
              Login
            </Link>
            <Link className="link-primary" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
