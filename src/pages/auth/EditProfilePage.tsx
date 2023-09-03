import EditProfileForm from "../../components/forms/auth/EditProfileForm";
import { EditProfileDto } from "../../models/auth/edit-profile.model";
import { useNavigate } from "react-router-dom";
import { useReducer, Reducer, useState } from "react";
import { authService } from "../../services/auth.service";
import { AuthState } from "../../state/auth.state";
import { useEffect } from "react";
import { AuthAction, initialAuthState } from "../../actions/auth.action";
import { authReducer } from "../../reducers/auth.reducer";
import { authActions } from "../../action-constants/auth.constant";

function EditProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialAuthState
  );
  const [editProfile, setEditProfile] = useState<EditProfileDto>(
    {} as EditProfileDto
  );

  useEffect(function () {
    authService
      .currentUser()
      .then(({ data }) =>
        //console.log("In editProfilePage, : ", data)

        setEditProfile((prev) => ({ ...prev, ...(data as EditProfileDto) }))
      )
      .catch((error) => console.log(error));
  }, []);

  const editProfileHandler = (editProfileDto: EditProfileDto) => {
    dispatch(new AuthAction(authActions.AUTH_BEGIN, true));
    authService
      .editProfile(editProfileDto)
      .then((authUser) => {
        dispatch(new AuthAction(authActions.AUTH_SUCCESS, authUser.data));
        authService.setAuthUser(state.user);
      })
      .catch((error) =>
        dispatch(new AuthAction(authActions.AUTH_FAILURE, error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <EditProfileForm
    formName="Edit Profile"
      initialValue={editProfile}
      onEditProfile={editProfileHandler}
      onBackToList={onBackToList}
    />
  );
}

export default EditProfilePage;
