import Todo from "@/pages/todo";
import User from "@/pages/user";
import BasicLayout from "@/layouts/BasicLayout";

import type { RouteObject } from "react-router-dom";

let routes: RouteObject[] = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Todo /> },
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
