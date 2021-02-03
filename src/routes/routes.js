import LayoutBasic from "../layouts/LayoutBasic";
import Home from "../views/Home";
import User from "../views/User";
import Error404 from "../views/Error404";

const routes = [
  {
    path: "/",
    layout: LayoutBasic,
    component: Home,
    exact: true,
  },
  {
    path: "/:username",
    layout: LayoutBasic,
    component: User,
    exact: true,
  },
  {
    layout: LayoutBasic,
    component: Error404,
  },
];

export default routes;
