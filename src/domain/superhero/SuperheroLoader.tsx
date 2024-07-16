import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../error/ErrorMessage";
import AuthContext from "../login/AuthContext";
import { Superhero } from "./Superhero";
import SuperheroContext from "./SuperheroContext";

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

  protected async sendRequestSuperheroes(
    url: string
  ): Promise<{ superheroes: Superhero[] } | Superhero > {
    //console.log(this.token);
  
    const { data } = await axios.get<{ superheroes: Superhero[] }>(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    });

    return data;
  }
}

class ListAbility extends RequestStrategy {
  async fetchSuperheroes(): Promise<Superhero[]> {
    const { superheroes } = (await this.sendRequestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/api/v1/superheroes`
    )) as { superheroes: Superhero[] };

    return superheroes;
  }
}

class SingleAbilty extends RequestStrategy {
  constructor(private id: string, token: string | null) {
    super(token);
  }

  async fetchSuperheroes(): Promise<Superhero[]> {
    const superheroes  = (await this.sendRequestSuperheroes(
      `${process.env.REACT_APP_API_SERVER}/api/v1/superheroes/${this.id}`
    )) as Superhero;

    return [ superheroes ];
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

        console.log(superheroes);

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
