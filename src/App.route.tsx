import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import EditProfilePage from "./pages/auth/EditProfilePage";
import SignupPage from "./pages/auth/SignupPage";
import { ProductListPage } from "./pages/products/ProductListPage";
import { Layout } from "./util/Layout";
import { ErrorPage } from "./util/ErrorPage";
import { PrivateRoutes } from "./util/PrivateRoutes";
import { HomePage } from "./pages/auth/HomePage";
import { MustLoginPage } from "./pages/auth/MustLoginPage";
import { NotAllowedPage } from "./pages/auth/NotAllowedPage";
import { UserListPage } from "./pages/users/UserListPage";
import { AdminRoute } from "./util/AdminRoute";
import { UserDeletePage } from "./pages/users/UserDeletePage";
import { UserEditPage } from "./pages/users/UserEditPage";
import { UserDetailPage } from "./pages/users/UserDetailPage";
import { ProductDetailPage } from "./pages/products/ProductDetailPage";
import { ProductCreatePage } from "./pages/products/ProductCreatePage";
import { ProductDeletePage } from "./pages/products/ProductDeletePage";
import { ProductEditPage } from "./pages/products/ProductEditPage";
import UserCreatePage from "./pages/users/UserCreatePage";
import { LogoutPage } from "./pages/auth/LogoutPage";
import { SomethingWrongPage } from "./pages/auth/SomethingWrongPage";
import { ListProductPage } from "./pages/products/ListProductPage";
import { DetailProductPage } from "./pages/products/DetailProductPage";
import { AdminPanel } from "./pages/admin/AdminPanel";
import { RoleUpdatePage } from "./pages/admin/RoleUpdatePage";
import { CreateCartItemPage } from "./pages/cartItems/CreateCartItemPage";
import { EditCartItemPage } from "./pages/cartItems/EditCartItemPage";
import { CreateOrderPage } from "./pages/orders/CreateOrderPage";
import { DeleteOrderPage } from "./pages/orders/DeleteOrderPage";
import { DetailOrderPage } from "./pages/orders/DetailOrderPage";
import { EditOrderPage } from "./pages/orders/EditOrderPage";
import { ListOrderPage } from "./pages/orders/ListOrderPage";
import { DeleteCartItemPage } from "./pages/cartItems/DeleteCartItemPage";
import { DetailCartItemPage } from "./pages/cartItems/DetailCartItemPage";
import { ListCartItemPage } from "./pages/cartItems/ListCartItemPage";
import { CreateCategoryPage } from "./pages/categories/CreateCategoryPage";
import { DeleteCategoryPage } from "./pages/categories/DeleteCategoryPage";
import { DetailCategoryPage } from "./pages/categories/DetailCategoryPage";
import { EditCategoryPage } from "./pages/categories/EditCategoryPage";
import { ListCategoryPage } from "./pages/categories/ListCategoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "logout", element: <LogoutPage /> },
      { path: "must-login", element: <MustLoginPage /> },
      { path: "not-allowed", element: <NotAllowedPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "something-wrong", element: <SomethingWrongPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "products",
        element: <ProductListPage /> 
      },
      {
        path: "products/detail/:id",
        element: <ProductDetailPage />,
      },
      { path: "change-password", element: <ChangePasswordPage /> },
      { path: "edit-profile", element: <EditProfilePage /> },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "users",
        element: <UserListPage />,
        children: [
          { path: "create", element: <UserCreatePage /> },
          { path: "delete/:id", element: <UserDeletePage /> },
          { path: "edit/:id", element: <UserEditPage /> },
          { path: "detail/:id", element: <UserDetailPage /> },
          { path: "make-admin/:id", element: <RoleUpdatePage /> },
        ],
      },
      {
        path: "list-product",
        element: <ListProductPage />,
        children: [
          { path: "create", element: <ProductCreatePage /> },
          { path: "delete/:id", element: <ProductDeletePage /> },
          { path: "detail/:id", element: <DetailProductPage /> },
          { path: "edit/:id", element: <ProductEditPage /> },
        ],
      },
      {
        path: "cart-items",
        element: <ListCartItemPage />,
        children: [
          { path: "create", element: <CreateCartItemPage/> },
          { path: "delete/:id", element: <DeleteCartItemPage /> },
          { path: "detail/:id", element: <DetailCartItemPage /> },
          { path: "edit/:id", element: <EditCartItemPage /> },
        ],
      },
      {
        path: "categories",
        element: <ListCategoryPage />,
        children: [
          { path: "create", element: <CreateCategoryPage/> },
          { path: "delete/:id", element: <DeleteCategoryPage /> },
          { path: "detail/:id", element: <DetailCategoryPage /> },
          { path: "edit/:id", element: <EditCategoryPage /> },
        ],
      },
      {
        path: "orders",
        element: <ListOrderPage />,
        children: [
          { path: "create", element: <CreateOrderPage/> },
          { path: "delete/:id", element: <DeleteOrderPage /> },
          { path: "detail/:id", element: <DetailOrderPage /> },
          { path: "edit/:id", element: <EditOrderPage /> },
        ],
      },
      { path: "admin-panel", element: <AdminPanel /> },
    ],
  },
]);
