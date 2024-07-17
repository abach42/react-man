import { Superhero } from "../domain/superhero/Superhero";
import { SuperheroInvoker } from "./SuperheroInvoker";

/*
Usage: 
  const receiver = new GetReceiver();
  const command = new SuperheroSingleCommand(receiver, token, 1);
  const invoker = new SuperheroConvertInvoker(command);
  const superheroe = await invoker.invoke();
*/
export class SuperheroConvertInvoker extends SuperheroInvoker {

  async invoke(): Promise<Superhero[]> {
    const superheroes = (await this.command.execute()) as unknown as Superhero;

    return [superheroes];
  }
}
