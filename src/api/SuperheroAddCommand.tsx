import { Superhero } from "../domain/superhero/Superhero";
import { SuperheroReceiver } from "./SuperheroReceiver";
import { SuperheroCommand } from "./SuperheroCommand";

export class SuperheroAddCommand implements SuperheroCommand {
  readonly url: string = `${process.env.REACT_APP_API_SERVER}/api/v1/superheroes`;

  constructor(private receiver: SuperheroReceiver, private token: string) {}

  async execute(): Promise<Superhero[] | { superheroes: Superhero[]; }> {
    return this.receiver.doRequest(this.token, this.url);
  }
}
