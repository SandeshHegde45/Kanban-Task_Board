import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

// Login and register are for logged-out users; send everyone else back in.
export default function PublicRoute() {
  const user = useSelector((s) => s.auth.user);
  const location = useLocation();
  return user ? <Navigate to={location.state?.from?.pathname ?? "/projects"} replace /> : <Outlet />;
}
