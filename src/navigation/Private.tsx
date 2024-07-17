import { useContext } from "react";
import AuthContext from "../domain/login/AuthContext";
import { Navigate } from "react-router-dom";

export const Private: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const { authRef } = useContext(AuthContext);
  
    return authRef.current ? <>{children}</> : <Navigate to="/login" replace />;
};