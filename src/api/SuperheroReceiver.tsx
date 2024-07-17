import { Superhero } from "../domain/superhero/Superhero";

export interface SuperheroReceiver {
  doRequest(token: string, url: string): Promise<Superhero[] | { superheroes: Superhero[]; }>;
}
