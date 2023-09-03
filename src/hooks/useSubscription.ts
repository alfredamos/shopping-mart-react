import { useEffect } from "react";
import { Observable } from "rxjs/internal/Observable";

export function useSubscription<T>(source$: Observable<T>, nextHandler: (value: T) =>void) {
  useEffect(function(){
    if(source$){
      const subs = source$.subscribe(nextHandler);

      return () => subs.unsubscribe();
    }
  },[nextHandler, source$]) 
}



