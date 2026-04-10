import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Login from "../pages/login";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/Login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login"/>;
    }

  } catch (err) {
    return <Navigate to="/login"/>;
  }

  return children;
}

export default ProtectedRoute;