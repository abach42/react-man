import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const LogoffPage: React.FC = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // When the component mounts, clear the authentication token
    setAuth("");
    // Redirect to the login page after logout
    navigate("/login");
  }, [setAuth, navigate]);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can optionally show a spinner or message here */}
    </div>
  );
};

export default LogoffPage;
