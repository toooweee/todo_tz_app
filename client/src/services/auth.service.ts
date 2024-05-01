import { IResponseData, IUser, IUserData } from "../types/types.ts";
import { instance } from "../api/axios.api.ts";

export const authService = {
  async registration(userData: IUserData): Promise<IResponseData | undefined> {
    const { data } = await instance.post<IResponseData>(
      "/user/register",
      userData,
    );
    return data;
  },

  async login(email: string, password: string): Promise<IUser> {
    const { data } = await instance.post<IUser>("auth/login", {
      email,
      password,
    });
    return data;
  },

  async getProfile() {
    const data = await instance.get<IUser>("auth/profile");
    if (data) {
      return data;
    }
  },
};
