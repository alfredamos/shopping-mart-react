import { userActions } from "../action-constants/user.constant";
import { UserAction } from "../actions/user.action";
import { UserDto } from "../models/auth/user.model";
import { UserState } from "../state/user.state";

export function userReducer(state: UserState, action: UserAction): UserState{
  switch(action.type){
    case userActions.USER_BEGIN: return {...state, users: [], isLoading: action.payload as boolean, errorMessage: ""};
    case userActions.USER_FAILURE: return {...state, users: [], isLoading: false, errorMessage: action.payload as string};
    case userActions.USER_SUCCESS_USERS: return {...state, users: action.payload as UserDto[], isLoading: false, errorMessage: ""};
    case userActions.USER_SUCCESS_USER: return {...state, user: action.payload as UserDto, isLoading: false, errorMessage: ""};
    default: return new UserState();
  }
}
