import { NavLink } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useObservable } from "../hooks/useObservable";
import { AuthApiResponse } from "../models/auth/api-response.model";
import { Role } from "../models/auth/user-type.model";

export function NavBar() {
  const authUser = useObservable<AuthApiResponse>(
    authService.authUser$,
    new AuthApiResponse()
  );

  const isLoggedIn = authUser?.isLoggedIn;
  const isAdmin = authUser.role === Role.Admin;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink type="button" className="navbar-brand mx-xxl-5" to="/products">
            Home
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item" v-if="isAdmin">
            <NavLink type="button" className="nav-navLNavLink mx-xxl-5" to="/users"
              >Users</NavLink
            >
          </li> */}
            </ul>
            <ul className="d-flex navbar-nav">
              {isLoggedIn && (
                <li className="nav-item dropdown mx-5">
                  <NavLink
                    type="button"
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        type="button"
                        className="dropdown-item"
                        to="/change-password"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        type="button"
                        className="dropdown-item"
                        to="/edit-profile"
                      >
                        Edit Profile
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item mx-5">
                  <NavLink type="button" className="nav-link" to="/login">
                    login
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li className="nav-item mx-5">
                  <NavLink type="button" className="nav-link" to="/admin-panel">
                    Admin
                  </NavLink>
                </li>
              )}
              {
                isLoggedIn &&
                <li className="nav-item mx-5">
                  <NavLink
                    type="button"
                    className="nav-link align-self-auto"
                    to="/logout"
                  >
                    logout
                  </NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
