import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GetReceiver } from "../../api/GetReceiver";
import { SuperheroConvertInvoker } from "../../api/SuperheroConvertInvoker";
import { SuperheroInvoker } from "../../api/SuperheroInvoker";
import { SuperheroListCommand } from "../../api/SuperheroListCommand";
import { SuperheroSingleCommand } from "../../api/SuperheroSingleCommand";
import ErrorMessage from "../../error/ErrorMessage";
import AuthContext from "../login/AuthContext";
import { Superhero } from "./Superhero";
import SuperheroContext from "./SuperheroContext";
import { usePage } from "./PageContext";
import { PageMeta } from "./PageMeta";
type Props = {
  id: string | null;
  children: React.ReactNode;
};

interface RequestStrategy {
  fetchSuperheroes(): Promise<Superhero[]>;
  getPageMeta(): PageMeta | null;
}

class ListAbility implements RequestStrategy {
  private readonly invoker!: SuperheroInvoker;

  constructor(private token: string, private page: number) {
    const receiver = new GetReceiver();
    const command = new SuperheroListCommand(receiver, this.token, this.page);
    this.invoker = new SuperheroInvoker(command);
  }

  getPageMeta(): PageMeta | null {
    return this.invoker.pageMeta;
  }

  async fetchSuperheroes(): Promise<Superhero[]> {
    return await this.invoker.invoke();
  }
}

class SingleAbility implements RequestStrategy {
  constructor(private token: string, private id: number) {}

  async fetchSuperheroes(): Promise<Superhero[]> {
    const receiver = new GetReceiver();
    const command = new SuperheroSingleCommand(receiver, this.token, this.id);
    const invoker = new SuperheroConvertInvoker(command);
    return await invoker.invoke();
  }

  getPageMeta(): PageMeta | null {
    return null;
  }
}

const SuperheroLoader: React.FC<Props> = ({ id, children }) => {
  const { authRef } = useContext(AuthContext);
  const [, setSuperheroes] = useContext(SuperheroContext);
  const { page, setPageMeta } = usePage();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let strategy: RequestStrategy;

    const token = authRef.current;

    strategy = new ListAbility(token, page);

    if (id !== null) {
      strategy = new SingleAbility(token, parseInt(id, 10));
    }

    (async () => {
      try {
        const superheroes = await strategy.fetchSuperheroes();

        if (!superheroes) {
          throw new Error("result was empty");
        }
        setSuperheroes(superheroes);

        if (strategy.getPageMeta() !== null) {
          setPageMeta(strategy.getPageMeta()!); // Set page metadata in context
        }
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
  }, [id, authRef, page, setSuperheroes, setPageMeta]);

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
