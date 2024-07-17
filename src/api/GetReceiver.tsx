import { Superhero } from "../domain/superhero/Superhero";
import { SuperheroReceiver } from "./SuperheroReceiver";
import axios from "axios";

/**
 * 
    const receiver = new GetReceiver();
    const command = new SuperheroListCommand(receiver, this.token, this.page);
    const invoker = new SuperheroInvoker(command);
    const invoker.invoke();

    const receiver = new GetReceiver();
    const command = new SuperheroSingleCommand(receiver, this.token, this.id);
    const invoker = new SuperheroConvertInvoker(command);
    const invoker.invoke();
 */
export class GetReceiver implements SuperheroReceiver {
  protected readonly METHOD: "GET" | "DELETE" = 'GET';
  
  async doRequest(
    token: string,
    url: string
  ): Promise<Superhero[] | { superheroes: Superhero[] }> {

    try {
      const response = await axios({
        method: this.METHOD,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch superheroes' + error);
    }
  }
}
