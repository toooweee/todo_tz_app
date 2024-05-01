export interface IResponseData {
  token: string;
  user: IResponseUser;
}

export interface IResponseUser {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  id: number | undefined;
}

export interface IUserData {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export interface IUser {
  id: number | undefined;
  email: string | undefined;
  token: string | undefined;
}

export interface ITask {
  title: string;
  body: string;
  id: number;
  user: IUser;
  createdAt: string;
}
