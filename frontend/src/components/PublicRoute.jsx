import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session) {
    return <div>Loading...</div>;
  }

  return (
    <div>{session ? <>{children}</> : <Navigate to="/" />}</div>
  );
};

export default PublicRoute;
