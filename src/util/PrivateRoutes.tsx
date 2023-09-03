import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useGetLoginState } from "../hooks/useGetLoginState";
import { NavBar } from "./NavBar";

export function PrivateRoutes() {
  const { isLoggedIn } = useGetLoginState(authService.authUser$);

  if (!isLoggedIn) return <Navigate replace to="/must-login" />;

  return (
    <>
     <NavBar /> 
      <Outlet />
    </>
  );
}
