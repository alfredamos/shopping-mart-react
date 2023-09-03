import { authActions } from "../action-constants/auth.constant";
import { AuthAction, initialAuthState } from "../actions/auth.action";
import { AuthApiResponse } from "../models/auth/api-response.model";
import { userSubInitial } from "../services/auth.service";
import { AuthState } from "../state/auth.state";

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case authActions.AUTH_BEGIN:
      return {
        ...state,
        isLoading: action.payload as boolean,
        isLoggedIn: false,
        errorMessage: "",
        user: userSubInitial,
      };
    case authActions.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.payload as string,
        user: userSubInitial,
      };
    case authActions.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        errorMessage: "",
        user: action.payload as AuthApiResponse,
      };
    default:
      return initialAuthState;
  }
}
