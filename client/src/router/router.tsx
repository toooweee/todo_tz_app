import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Home from "../pages/Home.tsx";
import Tasks, { tasksAction, tasksLoader } from "../pages/Tasks.tsx";
import Auth from "../pages/Auth.tsx";
import All from "../pages/All.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tasks",
        action: tasksAction,
        loader: tasksLoader,
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "all",
        element: <All />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);
