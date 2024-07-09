import { createContext, Dispatch, SetStateAction } from "react";
import { Superhero } from "./Superhero";
const SuperheroContext = createContext<
  [Superhero[], Dispatch<SetStateAction<Superhero[]>>]
>([[], () => {}]);

export default SuperheroContext;
