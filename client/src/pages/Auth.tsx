import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { authService as AuthService } from "../services/auth.service.ts";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { login } from "../store/user/userSlice.ts";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [isLogin, setIslogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({
        email,
        username,
        password,
      });
      if (data) {
        toast.success("Вы успешно зарегистрировались");
        setIslogin(!isLogin);
      }
    } catch (err: any) {
      const error = err.response?.data?.message;
      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login(email, password);

      if (data) {
        if (data.token != null) {
          setTokenToLocalStorage("token", data.token);
        }
        dispatch(login(data));
        toast.success("Вы успешно вошли");
        navigate("/");
      }
    } catch (err: any) {
      const error = err.response?.data?.message;
      toast.error(error.toString());
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-violet-300">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="flex w-1/3 flex-col mx-auto gap-5"
      >
        <input
          type="text"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isLogin && ( // Проверяем, является ли режим регистрации активным
          <input
            type="text"
            className="input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn mx-auto bg-blue-400">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            className="text-white/50 hover:text-white"
            onClick={() => setIslogin(!isLogin)}
          >
            Don't you have an account yet?
          </button>
        ) : (
          <button
            className="text-white/50 hover:text-white"
            onClick={() => setIslogin(!isLogin)}
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
