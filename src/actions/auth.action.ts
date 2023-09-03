import { AuthApiResponse } from "../models/auth/api-response.model";
import { userSubInitial } from "../services/auth.service";
import { AuthState } from "../state/auth.state";

export const initialAuthState: AuthState = {
  user: userSubInitial,
  isLoading: false,
  errorMessage: "",
  isLoggedIn: false,  
};

type Payload = boolean | string | AuthApiResponse;

export class AuthAction {
  constructor(public type: string, public payload: Payload) {}
}
