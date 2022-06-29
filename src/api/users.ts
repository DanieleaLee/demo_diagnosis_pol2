import {User} from "@interfaces/model";
import {request} from "./client";
import {SignupData} from "@components/template/RegisterTemplate";

export async function reqUsersLogin(data: { email: string; password: string }): Promise<User> {
  const {success, user, error} = await request({ url: "/api/users/login", method: "POST", data: data });

  if (!success && error)
    throw error;
  else
    return user;
}

export async function reqUsersMe(): Promise<{user:User}> {
  try {
    return await request({
      url: "/api/users/me",
      method: "GET",
      // headers: { "X-TOKEN": token },
    });
  } catch (e) {
    return undefined;
  }
}

export async function reqUsersMeSsr(): Promise<User> {
  try {
    return await request({
      url: "http://localhost:3000/api/users/me",
      method: "GET",
      // headers: { "X-TOKEN": token },
    });
  } catch (e) {
    return undefined;
  }
}

export async function reqUsersLogout(): Promise<User> {
  return await request({url: "/api/users/logout", method: "POST"});
}

export async function reqUsersCreate(data: SignupData): Promise<User|any> {
  return await request({url: "/api/users/signup", method: "POST", data: data});
}
