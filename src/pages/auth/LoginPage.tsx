import LoginForm from "../../components/forms/auth/LoginForm";
import { LoginDto } from "../../models/auth/login.model";
import { useNavigate } from "react-router-dom";
import { useReducer, Reducer } from "react";
import { authService } from "../../services/auth.service";
import { AuthAction, initialAuthState } from "../../actions/auth.action";
import { AuthState } from "../../state/auth.state";
import { authActions } from "../../action-constants/auth.constant";
import { authReducer } from "../../reducers/auth.reducer";

const initialValue: LoginDto = {
  email: "",
  password: "",
};

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const [, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialAuthState
  );

  const loginHandler = (loginDto: LoginDto) => {
    dispatch(new AuthAction(authActions.AUTH_BEGIN, true));
    authService
      .login(loginDto)
      .then((data) => {
        console.log({ data });

        dispatch(new AuthAction(authActions.AUTH_SUCCESS, data!));
        navigate("/products");
      })
      .catch((error) =>
        dispatch(new AuthAction(authActions.AUTH_FAILURE, error.message))
      );
  };

  const onBackToList = () => {
    navigate("/");
  };

  return (
    <LoginForm
      initialValue={initialValue}
      onLogin={loginHandler}
      onBackToList={onBackToList}
    />
  );
}

export default AuthPage;
