import React, { ReactNode, useState } from "react";
import { Superhero } from "./Superhero";
import SuperheroContext from "./SuperheroContext";

type Props = {
  children: ReactNode;
};

const SuperheroProvider: React.FC<Props> = ({ children }) => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);

  return (
    <SuperheroContext.Provider value={[superheroes, setSuperheroes]}>
      {children}
    </SuperheroContext.Provider>
  );
};

export default SuperheroProvider;
