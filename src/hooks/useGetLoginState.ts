import { useState } from "react";
import { Observable } from "rxjs/internal/Observable";
import { AuthApiResponse } from "../models/auth/api-response.model";
import { authService } from "../services/auth.service";
import { useGetLoginSubscription } from "./useGetLoginSubscription";

export function useGetLoginState(source$: Observable<AuthApiResponse>) {
  const { isLoggedIn: isLoggedInData } = authService.getCurrentAuthUser();
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInData);
  
  useGetLoginSubscription(source$, setIsLoggedIn);

  return { isLoggedIn };
}
