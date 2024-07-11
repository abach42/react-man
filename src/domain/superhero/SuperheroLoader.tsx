import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SuperheroContext from "./SuperheroContext";
import ErrorMessage from "../error/ErrorMessage";
import { Superhero } from "./Superhero";
import { CircularProgress } from "@mui/material";

type Props = {
  id: string | null;
  children: React.ReactNode
};

abstract class RequestStrategy {
  public abstract fetchSuperheroes(): Promise<Superhero[]>;

  protected async requestSuperheroes(
    url: string
  ): Promise<Superhero | Superhero[]> {
    const { data } = await axios.get<Superhero | Superhero[]>(url);
    return data;
  }
}

class ListAbility extends RequestStrategy {
  async fetchSuperheroes(): Promise<Superhero[]> {
    return (await this.requestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/superheroes`
    )) as Superhero[];
  }
}

class SingleAbilty extends RequestStrategy {
  constructor(private id: string) {
    super();
  }

  async fetchSuperheroes(): Promise<Superhero[]> {
    const heroes = (await this.requestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/superheroes/${this.id}`
    )) as Superhero;
    return [heroes];
  }
}

const SuperheroLoader: React.FC<Props> = ({ id, children }) => {
  const [, setSuperheroes] = useContext(SuperheroContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  let strategy = new ListAbility();

  if (id !== null) {
    strategy = new SingleAbilty(id as string);
  }

  useEffect(() => {
    (async () => {
      try {
        const superheroes = await strategy.fetchSuperheroes();

        if (!superheroes) {
          throw new Error("result was empty");
        }
        setSuperheroes(superheroes);
      } catch (error: any) {
        setError(
          `No superheroes loaded: ${
            error.message || "An error occurred while fetching superheroes"
          } ${error.response?.status ?? ""}`
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, setSuperheroes]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return isLoading ? <><CircularProgress /></> :  <>{children}</>;
};

export default SuperheroLoader;
