import { Reducer, useReducer, useEffect } from "react";
import { UserState } from "../../state/user.state";
import { UserAction } from "../../actions/user.action";
import { userReducer } from "../../reducers/user.reducer";
import { userActions } from "../../action-constants/user.constant";
import { userService } from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import UserDisplayOne from "../../components/displays/users/UserDisplayOne";

export function UserDeletePage() {
  const [userState, userDispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    new UserState()
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userDispatch(new UserAction(userActions.USER_BEGIN, true));
  }, []);

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("user-in-user-detail : ", data.user);

        userDispatch(new UserAction(userActions.USER_SUCCESS_USER, data.user!));
      })
      .catch((error) => {
        userDispatch(new UserAction(userActions.USER_FAILURE, error));
      });
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const userDeleteHandler = (value: boolean) => {
    if (value) {
      userService
        .deleteUser(id!)
        .then(() => {
          navigate("/users");
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <UserDisplayOne
      deleteHandler={userDeleteHandler}
      user={userState.user!}
      onBackToList={backToListHandler}
    />
  );
}
