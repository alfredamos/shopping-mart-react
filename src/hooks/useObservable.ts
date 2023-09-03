import { useState } from 'react';
import { Observable } from 'rxjs/internal/Observable';
import { useSubscription } from './useSubscription';

export function useObservable<T>(source$: Observable<T>, initialValue: T) {  
 const [value, setValue] = useState(initialValue);

 useSubscription(source$, setValue);

 console.log("authUser-value : ", value);
 

 return value;
}
