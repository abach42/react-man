import { Superhero } from "../domain/superhero/Superhero";

export interface SuperheroCommand {
  execute(): Promise<Superhero[] | { superheroes: Superhero[] }>;
}
