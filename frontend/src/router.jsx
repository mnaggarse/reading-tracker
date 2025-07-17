import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AddBookPage from "./pages/AddBookPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchBookPage from "./pages/SearchBookPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/add",
    element: (
      <PrivateRoute>
        <AddBookPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <PrivateRoute>
        <SearchBookPage />
      </PrivateRoute>
    ),
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <Error404Page /> }, // Fallback for unmatched routes
]);

export default router;
