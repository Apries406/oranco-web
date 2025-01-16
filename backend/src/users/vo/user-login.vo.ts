import { LoginUserDto } from "../dto/user-login.dto";
import { User } from "../entities/user.entities";

export class LoginUserVO {
  user: Partial<User>
  token: string;

  constructor(user: Partial<User>, token: string) {
    this.user = user;
    this.token = token;
  }
}