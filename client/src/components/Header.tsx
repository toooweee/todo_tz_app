import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { logout } from "../store/user/userSlice.ts";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper.ts";
import { toast } from "react-toastify";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("Вы успешно вышли из системы");
    navigate("/");
  };
  return (
    <header className="flex items-center p-4 shadow-sm bg-white dark:bg-violet-400 backdrop-blur-sm">
      <Link to="/">
        <FcTodoList size={40} />
      </Link>

      {/* menu */}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/tasks"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/all"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                All user tasks
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* actions */}

      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          to="/auth"
          className="py-2 text-white/50 hover:text-white ml-auto"
        >
          LogIn / SignIN
        </Link>
      )}
    </header>
  );
};

export default Header;
