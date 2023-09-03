import { useEffect } from "react";
import { Observable } from "rxjs/internal/Observable";
import { AuthApiResponse } from "../models/auth/api-response.model";

export function useGetLoginSubscription(
  source$: Observable<AuthApiResponse>,
  nextHandler: (value: boolean) => void
) {
  useEffect(
    function () {
      if (source$) {
        const subs = source$.subscribe(({ isLoggedIn }) => {          
          nextHandler(isLoggedIn);
        });

        return () => subs.unsubscribe();
      }
    },
    [nextHandler, source$]
  );
}
