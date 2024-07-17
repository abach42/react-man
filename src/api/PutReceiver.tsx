import { PostReceiver } from "./PostReceiver";

/*
Usage: 
      const token = authRef.current;
      const receiver = new PutReceiver(formData);
      const command = new SuperheroSingleCommand(receiver, token, superhero.id);
      const invoker = new SuperheroConvertInvoker(command);
      const updatedValue = await invoker.invoke(); 
*/
export class PutReceiver extends PostReceiver{
  protected readonly METHOD: "PUT" | "POST" = 'PUT';
}
