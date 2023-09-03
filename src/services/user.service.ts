import Axios from "../interceptors/axios.interceptor";
import { BehaviorSubject } from "rxjs";
import { UserDto } from "../models/auth/user.model";
import { UserApiResults } from "../models/users/user-results.model";
import { SignupDto } from "../models/auth/signup.model";
//import { AuthApiResponse } from "../models/auth/api-response.model";

export class UserService {
  private usersSubject = new BehaviorSubject<UserDto[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(public url: string) {
    const users = this.getUsersFromLocalStorage();
    if (users && users.length > 0) this.onLoad();
  }

  async createUser(userDto: SignupDto) {
    return await Axios.post<UserApiResults>(`${this.url}`, userDto);
  }

  onLoad() {
    console.log("In onload!!!");
    this.getAllUsers()
      .then((data) => {
        this.updateUsers$(data.users!);
        console.log({ users: data.users });
        localStorage.setItem("users", JSON.stringify(data.users));
      })
      .catch((error) => console.log(error));
  }

  async editUser(userDto: UserDto) {
    return await Axios.patch<UserApiResults>(
      `${this.url}/${userDto.id}`,
      userDto
    );
  }

  async deleteUser(id: string) {
    return await Axios.delete<UserApiResults>(`${this.url}/${id}`);
  }

  async getAllUsers() {
    const { data } = await Axios.get<UserApiResults>(this.url);

    return data;
  }

  async getUserById(id: string) {
    const {data} = await Axios.get<UserApiResults>(`${this.url}/${id}`);
    return data;
  }

  private getUsersFromLocalStorage(): UserDto[] {
    const users = JSON.parse(localStorage.getItem("users")!);
    return users;
  }

  updateUsers$(value: UserDto[]) {
    this.usersSubject.next(value);
  }

  updateWithOneUser$(value: UserDto){
    const allUsers = this.getUsers();
    const newAllUsers = [...allUsers, value];
    this.usersSubject.next(newAllUsers);
  }

  getUsers(): UserDto[] {
    return this.usersSubject.getValue();
  }
}

const userUrl = "/users";

export const userService = new UserService(userUrl);
