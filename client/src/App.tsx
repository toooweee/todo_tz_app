import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { useDispatch } from "react-redux";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper.ts";
import { login, logout } from "./store/user/userSlice.ts";
import { authService as AuthService } from "./services/auth.service.ts";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();

        if (data) {
          dispatch(login(data.data));
        } else {
          dispatch(logout());
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
