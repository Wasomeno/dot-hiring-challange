import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SessionContextProvider } from "../contexts/sessionContext";

export const Route = createRootRoute({
  component: () => (
    <SessionContextProvider>
      <Outlet />
    </SessionContextProvider>
  ),
});
