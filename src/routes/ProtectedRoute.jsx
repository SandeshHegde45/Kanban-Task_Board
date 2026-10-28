import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

// Only logged-in users get through; everyone else goes to /login.
export default function ProtectedRoute() {
  const user = useSelector((s) => s.auth.user);
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}
