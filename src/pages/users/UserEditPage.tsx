import { Reducer, useEffect, useReducer, useState } from "react";
import { UserState } from "../../state/user.state";
import { UserAction } from "../../actions/user.action";
import { userReducer } from "../../reducers/user.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../action-constants/user.constant";
import { userService } from "../../services/user.service";
import EditProfileForm from "../../components/forms/auth/EditProfileForm";
import { UserDto } from "../../models/auth/user.model";

export function UserEditPage() {
  const [, dispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    new UserState()
  );

  const [user, setUser] = useState({} as UserDto);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(new UserAction(userActions.USER_BEGIN, true));
  }, []);

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("user-in-user-detail : ", user);
        setUser((prev) => ({ ...prev, ...data.user }));
        dispatch(new UserAction(userActions.USER_SUCCESS_USER, data.user!));
      })
      .catch((error) => {
        dispatch(new UserAction(userActions.USER_FAILURE, error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const userEditHandler = (userDto: UserDto) => {
    userService
      .editUser(userDto)
      .then(({ data }) => {
        console.log("user-in-user-edit : ", data.user);

        dispatch(new UserAction(userActions.USER_SUCCESS_USER, data.user!));
        navigate("/users");
      })
      .catch((error) => {
        dispatch(new UserAction(userActions.USER_FAILURE, error));
      });
  };

  const backToListHandler = () => {
    navigate("/users");
  };

  return (
    <EditProfileForm
      formName="Edit Profile"
      initialValue={user}
      onEditProfile={userEditHandler}
      onBackToList={backToListHandler}
    />
  );
}
