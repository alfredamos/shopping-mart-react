import SignupForm from "../../components/forms/auth/SignupForm";
import { SignupDto } from "../../models/auth/signup.model";
import { useNavigate } from "react-router-dom";
import { useReducer, Reducer } from "react";
import { authService } from "../../services/auth.service";
import { AuthAction, initialAuthState } from "../../actions/auth.action";
import { AuthState } from "../../state/auth.state";
import { authActions } from "../../action-constants/auth.constant";
import { authReducer } from "../../reducers/auth.reducer";

function SignupPage(): JSX.Element {
  const [, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialAuthState
  );

  const navigate = useNavigate();

  const signupHandler = (signupDto: SignupDto) => {
    dispatch(new AuthAction(authActions.AUTH_BEGIN, true));
    authService
      .signup(signupDto)
      .then(({ data }) => {
        dispatch(new AuthAction(authActions.AUTH_SUCCESS, data));
        authService.setAuthUser(data);
        navigate("/");
      })
      .catch((error) =>
        dispatch(new AuthAction(authActions.AUTH_FAILURE, error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <SignupForm
      formName="Signup"
      initialValue={new SignupDto()}
      onSignup={signupHandler}
      onBackToList={onBackToList}
    />
  );
}

export default SignupPage;
