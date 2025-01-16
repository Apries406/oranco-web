import instance from ".";
import { User } from "../types";

interface UserLoginRes {
  data: {
    code: number,
      message: string,
      data: {
        token: string,
        user: User,
      }
  }
}

export function userLogin({email, password}: {email: string, password: string}): Promise<UserLoginRes> {
  return instance.post('users/login', {email, password})
}