import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SuperheroContext from "./SuperheroContext";
import ErrorMessage from "../error/ErrorMessage";
import { Superhero } from "./Superhero";
import { CircularProgress } from "@mui/material";
import AuthContext from "../login/AuthContext";

type Props = {
  id: string | null;
  children: React.ReactNode;
};

abstract class RequestStrategy {
  protected token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }
  public abstract fetchSuperheroes(): Promise<Superhero[]>;

  protected async requestSuperheroes(
    url: string
  ): Promise<{ superheroes: Superhero[] }> {
    console.log(this.token);
  
    const { data } = await axios.get<{ superheroes: Superhero[] }>(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });
  
    console.log(data);
    return data;
  }
}

class ListAbility extends RequestStrategy {
  async fetchSuperheroes(): Promise<Superhero[]> {
    const {superheroes} = (await this.requestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/api/v1/superheroes`
    ));

    return superheroes as Superhero[];
  }
}

class SingleAbilty extends RequestStrategy {
  constructor(private id: string, token: string | null) {
    super(token);
  }

  async fetchSuperheroes(): Promise<Superhero[]> {
    const {superheroes}  = (await this.requestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/api/v1/superheroes/${this.id}`
    )) ;
    return superheroes as Superhero[];
  }
}

const SuperheroLoader: React.FC<Props> = ({ id, children }) => {
  const [, setSuperheroes] = useContext(SuperheroContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, ] = useContext(AuthContext);  // Get the token from the AuthContext
  let strategy = new ListAbility(token);

  if (id !== null) {
    strategy = new SingleAbilty(id as string, token);
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

  return isLoading ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <>{children}</>
  );
};

export default SuperheroLoader;
