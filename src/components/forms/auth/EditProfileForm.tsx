import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Gender } from "../../../models/auth/gender.model";
import { EditProfileDto } from "../../../models/auth/edit-profile.model";

interface Props {
  formName: string;
  initialValue: EditProfileDto;
  onEditProfile: (editProfileDto: EditProfileDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email().required("Email is required!"),
  phone: yup.string().required("Phone is required!"),
  password: yup.string().min(6).max(15).required("Password is required!"),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required("Gender is required!"),
});

const EditProfileForm = ({
  formName,
  initialValue,
  onEditProfile,
  onBackToList,
}: Props) => {

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditProfileDto>({
    values: { ...initialValue },
    resolver: yupResolver<EditProfileDto>(schema),
  });

  return (
    <div className="row mt-5">      
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card" style={{background: 'bg-light'}}>
          <form
            onSubmit={handleSubmit((data: EditProfileDto) => {
              onEditProfile({...data});
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">{formName} Form</h4>
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
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="form-select"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
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

export default EditProfileForm;
