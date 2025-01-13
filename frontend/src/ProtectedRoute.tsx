import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";

const ProtectedRoute = ({ children }: { children: any }) => {
  const token = getCookie("authToken");

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
