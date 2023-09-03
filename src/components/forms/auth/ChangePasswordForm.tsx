import { useForm } from "react-hook-form";
import { ChangePasswordDto } from "../../../models/auth/change-password.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  initialValue: ChangePasswordDto;
  onChangePassword: (changePasswordDto: ChangePasswordDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  oldPassword: yup.string().min(4).max(15).required("Password is required!"),
  newPassword: yup.string().min(4).max(15).required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null!], "Password must match!")
    .required("Confirm Password is required!"),
});

const ChangePasswordForm = ({
  initialValue,
  onChangePassword,
  onBackToList,
}: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
   values: {...initialValue},
    resolver: yupResolver<ChangePasswordDto>(schema),
  });

  return (
    <div className="row mt-5">      
      <div className="col col-sm-8 col-md-8 col-lg-8 p-2 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: ChangePasswordDto) => {
              console.log("At point 1, data-changePassword : ", data);

              onChangePassword({...data});
              reset();
            })}
          >
            <div className="card-header">
              <h4 className="text-center">ChangePassword Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.email?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  {...register("oldPassword")}
                  type="password"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.oldPassword?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  {...register("newPassword")}
                  type="password"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.newPassword?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.confirmPassword?.message}
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

export default ChangePasswordForm;
