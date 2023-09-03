import { useForm } from "react-hook-form";
import { LoginDto } from "../../../models/auth/login.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  initialValue: LoginDto;
  onLogin: (loginDto: LoginDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().min(4).max(15).required("Password is required!"),
});

const LoginForm = ({ onLogin, onBackToList, initialValue }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginDto>({
    values: {...initialValue},
    resolver: yupResolver<LoginDto>(schema),
  });

  return (
    <div className="row mt-5">      
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: LoginDto) => {
              onLogin({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Login Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.email?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-outline-primary form-control fw-bold"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary form-control fw-bold"
                onClick={onBackToList}
              >
                Back
              </button>
            </div>
          </form>
        </div>        
      </div>
    </div>
  );
};

export default LoginForm;
