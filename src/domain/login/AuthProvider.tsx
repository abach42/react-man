import React, { ReactNode, useRef, useEffect } from "react";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

const SuperheroProvider: React.FC<Props> = ({ children }) => {
  const authRef = useRef<string>(localStorage.getItem('authToken') || '');

  const setAuth = (token: string) => {
    authRef.current = token;
    localStorage.setItem('authToken', token);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      authRef.current = storedToken;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authRef, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SuperheroProvider;
