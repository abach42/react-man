import { PageMeta } from "../domain/superhero/PageMeta";
import { Superhero } from "../domain/superhero/Superhero";
import { SuperheroCommand } from "./SuperheroCommand";

/*
Usage: 

  const receiver = new GetReceiver();
  const command = new SuperheroListCommand(receiver, token);
  const invoker = new SuperheroInvoker(command);
  const superheroes = await invoker.invoke();
*/
export class SuperheroInvoker {
  constructor(protected command: SuperheroCommand) {}

  pageMeta: PageMeta | null = null;

  async invoke(): Promise<Superhero[]> {
    const { pageMeta, superheroes } = (await this.command.execute()) as {
      pageMeta: PageMeta;
      superheroes: Superhero[];
    };

    this.pageMeta = pageMeta;

    return superheroes;
  }
}
