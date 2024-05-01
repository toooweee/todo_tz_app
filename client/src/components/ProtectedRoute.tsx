import { FC } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import img from "../assets/react.svg";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl">
            Авторизуйтесь, чтобы увидеть эту страницу
          </h1>
          <img src={img} alt="image" className="w-1/3" />
        </div>
      )}
    </>
  );
};
