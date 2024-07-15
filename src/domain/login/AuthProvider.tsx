import React, { ReactNode, useState } from "react";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

const SuperheroProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<string>('');

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default SuperheroProvider;
