import { createContext, Dispatch, SetStateAction } from "react";

const AuthContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(['', () => {}]);

export default AuthContext;