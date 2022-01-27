import type { RouteObject } from "react-router-dom";
import Index from "@/pages/index";
import Todo from "@/pages/todo";
import User from "@/pages/user";
import BasicLayout from "@/layouts/BasicLayout";

let routes: RouteObject[] = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "/user",
        element: <User />,
      },
      { path: "*", element: <Todo /> },
    ],
  },
];

export default routes;
