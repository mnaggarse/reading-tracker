import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
