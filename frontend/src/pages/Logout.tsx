import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCookie, removeCookie } from "typescript-cookie";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = getCookie("authToken");
    if (token) {
      removeCookie("authToken");
      navigate("/");
    }
  }, [navigate]);

  return <></>;
}
