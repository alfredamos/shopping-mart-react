import ChangePasswordForm from "../../components/forms/auth/ChangePasswordForm";
import { ChangePasswordDto } from "../../models/auth/change-password.model";
import { useNavigate } from "react-router-dom";
import { useReducer, Reducer, useState } from "react";
import { authService } from "../../services/auth.service";
import { AuthState } from "../../state/auth.state";
import { useEffect } from "react";
import { AuthAction, initialAuthState } from "../../actions/auth.action";
import { authActions } from "../../action-constants/auth.constant";
import { authReducer } from "../../reducers/auth.reducer";

function ChangePasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialAuthState
  );
  const [changePassword, setChangePassword] = useState<ChangePasswordDto>(
    {} as ChangePasswordDto
  );

  useEffect(function () {
    authService
      .currentUser()
      .then(({ data }) => setChangePassword((prev) => ({ ...prev, ...data })))
      .catch((error) => console.log(error));
  }, []);

  const changePasswordHandler = (changePasswordDto: ChangePasswordDto) => {
    console.log("changePasswordDto input : ", changePassword);

    dispatch(new AuthAction(authActions.AUTH_BEGIN, true));
    authService
      .changePassword(changePasswordDto)
      .then((authUser) => {
        dispatch(new AuthAction(authActions.AUTH_SUCCESS, authUser.data));
        authService.setAuthUser(state.user);
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
    <ChangePasswordForm
      initialValue={changePassword}
      onChangePassword={changePasswordHandler}
      onBackToList={onBackToList}
    />
  );
}

export default ChangePasswordPage;
