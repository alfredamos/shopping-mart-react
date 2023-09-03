import Axios from "../interceptors/axios.interceptor";
import { LoginDto } from "../models/auth/login.model";
import { SignupDto } from "../models/auth/signup.model";
import { EditProfileDto } from "../models/auth/edit-profile.model";
import { BehaviorSubject } from "rxjs";
import { ChangePasswordDto } from "../models/auth/change-password.model";
import { AuthApiResponse } from "../models/auth/api-response.model";
import { UserDetail } from "../models/auth/user-detail.model";
import { UserRoleDto } from "../models/auth/user-role.model";

export const userSubInitial: AuthApiResponse = {
  message: "",
  token: "",
  isLoggedIn: false,
};

class AuthService {
  private authUserSubject = new BehaviorSubject<AuthApiResponse>(
    userSubInitial
  );
  authUser$ = this.authUserSubject.asObservable();

  constructor(public url: string) {
    const authUser = this.getLocalAuthUser();
    if (authUser) this.updateAuthUser$(authUser);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    return await Axios.patch<AuthApiResponse>(
      `${this.url}/change-password`,
      changePasswordDto
    );
  }

  async currentUser() {
    return await Axios.get<UserDetail>(`${this.url}/current-user`);
  }

  async editProfile(editProfileDto: EditProfileDto) {
    return await Axios.patch<AuthApiResponse>(
      `${this.url}/edit-profile`,
      editProfileDto
    );
  }

  async changeUserRole(changeUserRoleDto: UserRoleDto) {
    console.log("admin-user, user : ", changeUserRoleDto);
    return await Axios.patch<AuthApiResponse>(
      `${this.url}/change-role`,
      changeUserRoleDto
    );
  }

  getLocalAuthUser(): AuthApiResponse {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")!
    ) as AuthApiResponse;
    return userInfo;
  }

  getCurrentAuthUser(): AuthApiResponse {
    return this.authUserSubject.getValue();
  }

  async login(loginDto: LoginDto) {
    const { data } = await Axios.post<AuthApiResponse>(
      `${this.url}/login`,
      loginDto
    );
    this.setAuthUser(data);
    return data;
  }

  logout(value: AuthApiResponse) {
    this.setAuthUser(value);
    localStorage.removeItem("products");
  }

  removeAuthUser() {
    this.updateAuthUser$(userSubInitial);
    localStorage.removeItem("userInfo");
  }

  setAuthUser(value: AuthApiResponse) {
    this.updateAuthUser$(value);
    console.log({ value });
    localStorage.setItem("userInfo", JSON.stringify(value));
  }

  async signup(signupDto: SignupDto) {
    return await Axios.post<AuthApiResponse>(`${this.url}/signup`, signupDto);
  }

  updateAuthUser$(value: AuthApiResponse) {
    this.authUserSubject.next(value);
  }
}

const authUrl = "/auth";
export const authService = new AuthService(authUrl);
