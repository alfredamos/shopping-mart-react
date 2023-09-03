import { AuthApiResponse } from "../models/auth/api-response.model";
import { userSubInitial } from "../services/auth.service";
import { AuthState } from "../state/auth.state";

export const initialSignupData: AuthState = {
  user: userSubInitial,
  isLoading: false,
  errorMessage: "",
};

type Payload = boolean | string | AuthApiResponse;

export class SignupAction {
  constructor(public type: string, public payload: Payload) {}
}
