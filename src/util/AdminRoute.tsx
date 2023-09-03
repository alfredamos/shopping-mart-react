import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../models/auth/user-type.model";
import { authService } from "../services/auth.service";
import { NavBar } from "./NavBar";

export function AdminRoute() {
  
  const {role } = authService.getLocalAuthUser();
  const isAdmin = role === Role.Admin;

  console.log({role, isAdmin})

  if (!isAdmin) return <Navigate replace to="/not-allowed" />;

  return (
    <>
       <NavBar /> 
      <Outlet />
    </>
  );
}
