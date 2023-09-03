import { Link } from "react-router-dom";

export const NotAllowedPage = () => {
  return (
    <div className="row mt-5">
      <div className="col col-sm-6 offset-3">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <p className="lead text-primary">
              You are not allowed to view this page. You need to be authorized in other to view this page. Please get appropriate authorization to proceed!
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
}
