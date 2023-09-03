import { AuthApiResponse } from "../models/auth/api-response.model";

export class AuthState {
  user!: AuthApiResponse;
  isLoading!: boolean;
  errorMessage!: string;
  isLoggedIn?: boolean;
}
