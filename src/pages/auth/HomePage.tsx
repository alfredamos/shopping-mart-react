import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetLoginState } from "../../hooks/useGetLoginState";
import { authService } from "../../services/auth.service";

export const HomePage = () => {
  const { isLoggedIn } = useGetLoginState(authService.authUser$);
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn){
      navigate("/products")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="row mt-5">
      <div className="col col-sm-6 offset-3">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <p className="lead text-primary">
              You are welcome to Product commerce Management System where we
              deal in all kinds of products. Please login if you have an account
              if not please signup to have access to our choice products!
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
