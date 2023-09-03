import { useReducer, Reducer, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../action-constants/user.constant";
import { UserAction } from "../../actions/user.action";
import { UserRoleDto } from "../../models/auth/user-role.model";
import { userReducer } from "../../reducers/user.reducer";
import { UserState } from "../../state/user.state";
import { userService } from "../../services/user.service";
import UserRoleForm from "../../components/forms/auth/UserRoleForm";
import { authService } from "../../services/auth.service";

export function RoleUpdatePage() {
  const [, dispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    new UserState()
  );

  const [userRoleUpdate, setUserRoleUpdate] = useState(new UserRoleDto());

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(new UserAction(userActions.USER_BEGIN, true));
  }, []);

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("userRoleUpdate-in-userRoleUpdate-detail : ", userRoleUpdate);
        setUserRoleUpdate((prev) => ({ ...prev, 
          name: data.user?.name,
          email: data.user?.email,
          phone: data.user?.phone,
          gender: data.user?.gender,
          role: data.user?.role,
         }) as UserRoleDto);
        dispatch(new UserAction(userActions.USER_SUCCESS_USER, data.user!));
      })
      .catch((error) => {
        dispatch(new UserAction(userActions.USER_FAILURE, error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function userRoleUpdateHandler(userDto: UserRoleDto){
    console.log("user-info, user : ", userDto)
    authService.changeUserRole(userDto)
      .then(({ data }) => {
        console.log("userRoleUpdate-in-userRoleUpdate-edit : ", data);

        navigate("/users");
      })
      .catch((error) => {
        dispatch(new UserAction(userActions.USER_FAILURE, error));
      });
  }

  const backToListHandler = () => {
    navigate("/users");
  };
  return (
    <UserRoleForm
    initialValue={userRoleUpdate}
    onBackToList={backToListHandler}
    onUserRole={userRoleUpdateHandler}
    />
  )
}
