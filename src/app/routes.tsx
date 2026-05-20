import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/project/:id",
    Component: ProjectDetail,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
