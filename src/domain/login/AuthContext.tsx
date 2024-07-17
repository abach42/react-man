import { createContext } from "react";

const AuthContext = createContext<{
  authRef: React.MutableRefObject<string>;
  setAuth: (token: string) => void;
}>({
  authRef: { current: "" },
  setAuth: () => {},
});

export default AuthContext;
