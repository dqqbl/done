import { Navigate } from "react-router-dom";
import Index from "@/pages/index";
import Todo from "@/pages/todo";
import User from "@/pages/user";
import BasicLayout from "@/layouts/BasicLayout";
import { ReactElement } from "react";

let getRoutes = (isLoggedIn = false) => {
  const Auth = (props: { element: ReactElement }) => {
    return isLoggedIn ? props.element : <Navigate to="/" />;
  };
  return [
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "/todo",
          element: <Auth element={<Todo />} />,
        },
        {
          path: "/user",
          element: <Auth element={<User />} />,
        },
        { path: "*", element: <Index /> },
      ],
    },
  ];
};

export default getRoutes;
