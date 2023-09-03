import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NavBar } from "./NavBar";

export function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <div>Oops</div>
      <div>
        {isRouteErrorResponse(error)
          ? "This page does not exist!"
          : "An unexpected error occurred! "}
      </div>
    </>
  );
}
