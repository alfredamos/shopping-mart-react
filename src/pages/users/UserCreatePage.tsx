import SignupForm from "../../components/forms/auth/SignupForm";
import { SignupDto } from "../../models/auth/signup.model";
import { useNavigate } from "react-router-dom";
import { useReducer, Reducer } from "react";
import { userService } from "../../services/user.service";
import { userActions } from "../../action-constants/user.constant";
import { UserAction } from "../../actions/user.action";
import { UserState } from "../../state/user.state";
import { userReducer } from "../../reducers/user.reducer";

function UserCreatePage(): JSX.Element {
  const [, dispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    new UserState()
  );

  const navigate = useNavigate();

  const signupHandler = (signupDto: SignupDto) => {
    dispatch(new UserAction(userActions.USER_BEGIN, true));
    userService
      .createUser(signupDto)
      .then(({ data }) => {
        dispatch(new UserAction(userActions.USER_SUCCESS_USER, data.user!));
        userService.updateWithOneUser$(data.user!);
        navigate("/users");
      })
      .catch((error) =>
        dispatch(new UserAction(userActions.USER_FAILURE, error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <SignupForm
      formName="User Create"
      initialValue={new SignupDto()}
      onSignup={signupHandler}
      onBackToList={onBackToList}
    />
  );
}

export default UserCreatePage;
