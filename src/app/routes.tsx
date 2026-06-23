import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import NotFound from "./components/NotFound";
import AuthQaProject from "./components/AuthQaProject";
import AutoworksE2eQa from "./components/AutoworksE2eQa";
import SeomseReservationQaDoc from "./components/SeomseReservationQaDoc";
// import SeomseLoginE2eQa from "./components/SeomseLoginE2eQa";

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
  // {
  //   path: "/qa/seomse-login-e2e",
  //   Component: SeomseLoginE2eQa,
  // },
  {
    path: "/qa/operations-e2e-smoke",
    Component: AutoworksE2eQa,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
