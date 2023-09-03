import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Gender } from "../../../models/auth/gender.model";
import { UserRoleDto } from "../../../models/auth/user-role.model";
import { Role } from "../../../models/auth/user-type.model";

interface Props {
  initialValue: UserRoleDto;
  onUserRole: (userRoleDto: UserRoleDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email().required("Email is required!"),
  phone: yup.string().required("Phone is required!"),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required("Gender is required!"),
  role: yup
    .mixed<Role>()
    .oneOf(Object.values(Role))
    .required("Role is required!"),
});

const UserRoleForm = ({ initialValue, onUserRole, onBackToList }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserRoleDto>({
    values: { ...initialValue },
    resolver: yupResolver<UserRoleDto>(schema),
  });

  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card" style={{ background: "bg-light" }}>
          <form
            onSubmit={handleSubmit((data: UserRoleDto) => {
              onUserRole({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">User Role Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.name?.message}
                </p>
              </div>
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
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select {...register("gender")} className="form-select">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select {...register("role")} className="form-select">
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                </select>
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

export default UserRoleForm;
