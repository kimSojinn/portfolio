import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import NotFound from "./components/NotFound";
import AuthQaProject from "./components/AuthQaProject";
import SeomseReservationQaDoc from "./components/SeomseReservationQaDoc";

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
    path: "/qa/authentication",
    Component: AuthQaProject,
  },
  {
    path: "/qa/seomse-reservation",
    Component: SeomseReservationQaDoc,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
