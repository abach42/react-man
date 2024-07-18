import { Superhero } from "../domain/superhero/Superhero";
import { SuperheroReceiver } from "./SuperheroReceiver";
import axios from "axios";

/**
    const redeiver = new PostReceiver(formData as Superhero);
    const command = new SuperheroAddCommand(redeiver, token);
    const invoker = new SuperheroConvertInvoker(command);
    const created = await invoker.invoke();
 */
export class PostReceiver implements SuperheroReceiver {
  protected readonly METHOD: "PUT" | "POST" = "POST";
  constructor(private superheroPayload: Superhero) {}

  async doRequest(
    token: string,
    url: string
  ): Promise<Superhero[] | { superheroes: Superhero[] }> {
    const response = await axios({
      method: this.METHOD,
      url: url,
      data: this.superheroPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).catch((error) => {
      throw new Error(error.response.data.message);
    });
    
    return response.data;
  }
}
