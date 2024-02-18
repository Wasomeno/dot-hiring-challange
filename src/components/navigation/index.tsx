import { Link, RoutesByPath } from "@tanstack/react-router";
import { useSession } from "../../contexts/sessionContext";
import { Button } from "../ui/button/button";

import { routeTree } from "../../routeTree.gen";

import "./style.css";

type Route = {
  label: string;
  path: keyof RoutesByPath<typeof routeTree>;
};

const routes: Route[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shipping Cost Checker",
    path: "/shipping-cost-checker",
  },
  {
    label: "Login",
    path: "/login",
  },
];

export const Navigation = () => {
  const { session, setSession } = useSession();

  return (
    <div className="navigation">
      {routes.map((route) =>
        route.path === "/login" && session.username !== "" ? (
          <Button onClick={() => setSession({ username: "" })}>Logout</Button>
        ) : (
          <Link className="navigation__link" to={route.path}>
            {route.label}
          </Link>
        )
      )}
    </div>
  );
};
