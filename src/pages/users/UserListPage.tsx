import { Reducer, useReducer, useEffect } from "react";
import { UserState } from "../../state/user.state";
import { UserAction } from "../../actions/user.action";
import { userReducer } from "../../reducers/user.reducer";
import { Outlet } from "react-router-dom";
import { userActions } from "../../action-constants/user.constant";
import { UserDto } from "../../models/auth/user.model";
import { userService } from "../../services/user.service";
import UsersTable from "../../components/displays/users/UsersTable";

export function UserListPage() {
  const [state, dispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    new UserState()
  );

  useEffect(() => {
    dispatch(new UserAction(userActions.USER_BEGIN, true));
  }, []);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")!) as UserDto[];
    if (users && users.length > 0) {
      dispatch(new UserAction(userActions.USER_SUCCESS_USERS, users));
    } else {
      userService
        .getAllUsers()
        .then((data) => {
          userService.updateUsers$(data.users!);
          dispatch(new UserAction(userActions.USER_SUCCESS_USERS, data.users!));
        })
        .catch((error) => {
          dispatch(new UserAction(userActions.USER_FAILURE, error));
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <UsersTable users={state.users!} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
